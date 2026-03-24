"""The ``parityscope audit`` command — run a complete fairness audit.

Usage example::

    parityscope audit --data patient_data.csv --model-name sepsis_v2 \
        --attributes race sex --jurisdiction eu-ai-act --domain diagnosis
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import click
import pandas as pd

from parityscope.cli.config import AuditConfig, load_config
from parityscope.cli.display import (
    console,
    display_audit_result,
    display_error,
    display_progress,
    display_recommendations,
    display_success,
    display_warning,
    display_welcome,
)


@click.command()
@click.option(
    "--data",
    type=click.Path(exists=True),
    help="Path to CSV or Excel data file (required).",
)
@click.option(
    "--config",
    "config_path",
    type=click.Path(exists=True),
    default=None,
    help="Path to YAML/JSON config file. Overrides other options when provided.",
)
@click.option(
    "--model-name",
    default=None,
    help="Model identifier (required unless specified in config).",
)
@click.option(
    "--attributes",
    multiple=True,
    help="Protected attributes to evaluate (can be specified multiple times).",
)
@click.option(
    "--jurisdiction",
    type=click.Choice(
        ["eu-ai-act", "section-1557", "south-korea", "taiwan"],
        case_sensitive=False,
    ),
    default=None,
    help="Regulatory jurisdiction for metric selection.",
)
@click.option(
    "--domain",
    type=click.Choice(
        ["diagnosis", "risk_stratification", "treatment_recommendation",
         "resource_allocation", "triage"],
        case_sensitive=False,
    ),
    default=None,
    help="Clinical domain for metric relevance.",
)
@click.option(
    "--output-dir",
    type=click.Path(),
    default="./parityscope_output",
    show_default=True,
    help="Output directory for reports and evidence.",
)
@click.option(
    "--format",
    "output_format",
    type=click.Choice(["json", "pdf", "both", "all"], case_sensitive=False),
    default="both",
    show_default=True,
    help="Output report format.",
)
@click.option(
    "--intersectional/--no-intersectional",
    default=False,
    show_default=True,
    help="Enable intersectional analysis.",
)
@click.option(
    "--bootstrap/--no-bootstrap",
    default=False,
    show_default=True,
    help="Enable bootstrap confidence intervals.",
)
@click.option(
    "--root-cause/--no-root-cause",
    "include_root_cause",
    default=True,
    show_default=True,
    help="Include root cause analysis.",
)
@click.option(
    "--recommendations/--no-recommendations",
    "include_recommendations",
    default=True,
    show_default=True,
    help="Include recommendations.",
)
@click.option(
    "--verbose/--quiet",
    default=True,
    show_default=True,
    help="Output verbosity.",
)
def audit(
    data: str | None,
    config_path: str | None,
    model_name: str | None,
    attributes: tuple[str, ...],
    jurisdiction: str | None,
    domain: str | None,
    output_dir: str,
    output_format: str,
    intersectional: bool,
    bootstrap: bool,
    include_root_cause: bool,
    include_recommendations: bool,
    verbose: bool,
) -> None:
    """Run a complete fairness audit on a clinical AI model.

    Loads the dataset, computes fairness metrics across protected attributes,
    optionally performs root cause analysis and generates recommendations,
    then produces reports in the requested formats.
    """
    try:
        # ----- Step 1: Welcome banner -----
        if verbose:
            display_welcome()

        # ----- Resolve configuration -----
        cfg = _resolve_config(
            data=data,
            config_path=config_path,
            model_name=model_name,
            attributes=attributes,
            jurisdiction=jurisdiction,
            domain=domain,
            output_dir=output_dir,
            output_format=output_format,
            intersectional=intersectional,
            bootstrap=bootstrap,
            include_root_cause=include_root_cause,
            include_recommendations=include_recommendations,
        )

        # Validate required fields
        if not cfg.data_path:
            display_error("--data is required. Provide a path to your CSV/Excel data file.")
            sys.exit(1)
        if not cfg.model_name:
            display_error("--model-name is required. Provide a model identifier.")
            sys.exit(1)
        if not cfg.protected_attributes:
            display_error("--attributes is required. Specify at least one protected attribute.")
            sys.exit(1)

        # ----- Step 2: Load data -----
        if verbose:
            console.print(f"[bold]Loading data from:[/bold] {cfg.data_path}")

        df = _load_data(cfg.data_path)

        if verbose:
            console.print(f"  Loaded {len(df):,} rows, {len(df.columns)} columns")
            console.print()

        # ----- Step 3: Extract arrays from DataFrame -----
        col_map = cfg.column_map or {}
        pred_col = col_map.get("predictions", "predictions")
        label_col = col_map.get("labels", "labels")
        score_col = col_map.get("scores", "scores")

        if pred_col not in df.columns:
            display_error(f"Predictions column '{pred_col}' not found in data. Available columns: {list(df.columns)}")
            sys.exit(1)
        if label_col not in df.columns:
            display_error(f"Labels column '{label_col}' not found in data. Available columns: {list(df.columns)}")
            sys.exit(1)

        y_pred = df[pred_col].values
        y_true = df[label_col].values
        y_score = df[score_col].values if score_col in df.columns else None

        # Build demographics DataFrame
        missing_attrs = [a for a in cfg.protected_attributes if a not in df.columns]
        if missing_attrs:
            display_error(f"Protected attribute columns not found: {missing_attrs}. Available columns: {list(df.columns)}")
            sys.exit(1)

        demographics = df[list(cfg.protected_attributes)]

        # ----- Step 4: Run audit -----
        from parityscope.audit.engine import FairnessAudit

        if verbose:
            console.print("[bold]Running fairness audit...[/bold]")

        with display_progress() as progress:
            task = progress.add_task("Computing fairness metrics...", total=None)

            audit_engine = FairnessAudit(
                model_name=cfg.model_name,
                protected_attributes=cfg.protected_attributes,
                jurisdiction=cfg.jurisdiction,
                clinical_domain=cfg.clinical_domain,
                thresholds=cfg.thresholds,
            )
            result = audit_engine.run(
                y_true=y_true,
                y_pred=y_pred,
                demographics=demographics,
                y_score=y_score,
            )
            progress.update(task, completed=True)

        # ----- Step 5: Display results -----
        if verbose:
            display_audit_result(result)

        # ----- Step 6: Root cause analysis (optional) -----
        root_cause_results = None
        if cfg.include_root_cause:
            try:
                from parityscope.rootcause import RootCauseAnalysis  # type: ignore[import-not-found]

                if verbose:
                    console.print("[bold]Running root cause analysis...[/bold]")
                rca = RootCauseAnalysis(protected_attributes=list(cfg.protected_attributes))
                # Extract feature columns (everything that's not labels/predictions/demographics)
                col_map = cfg.column_map or {}
                exclude_cols = set(cfg.protected_attributes)
                exclude_cols.add(col_map.get("predictions", "predictions"))
                exclude_cols.add(col_map.get("labels", "labels"))
                exclude_cols.add(col_map.get("scores", "scores"))
                feature_cols = [c for c in df.columns if c not in exclude_cols]
                X_features = df[feature_cols].select_dtypes(include=["number"])
                demographics_df = df[list(cfg.protected_attributes)]
                root_cause_results = rca.run(X_features, y_true, y_pred, demographics_df)
                if verbose:
                    console.print("[green]Root cause analysis complete.[/green]")
            except ImportError:
                if verbose:
                    display_warning(
                        "Root cause analysis module not available. "
                        "Skipping. Install the rootcause extra to enable."
                    )

        # ----- Step 7: Recommendations (optional) -----
        recommendation_results = None
        if cfg.include_recommendations:
            try:
                from parityscope.recommendations import prioritize_findings  # type: ignore[import-not-found]

                if verbose:
                    console.print("[bold]Generating recommendations...[/bold]")
                recommendation_results = prioritize_findings(result)
                if verbose:
                    display_recommendations(recommendation_results)
            except ImportError:
                if verbose:
                    display_warning(
                        "Recommendations module not available. "
                        "Skipping. Install the recommendations extra to enable."
                    )

        # ----- Step 8: Generate reports -----
        out_dir = Path(cfg.output_dir)
        out_dir.mkdir(parents=True, exist_ok=True)

        formats = _resolve_formats(cfg.output_formats)
        generated_files: list[str] = []

        if "json" in formats:
            json_path = out_dir / f"{cfg.model_name}_audit.json"
            from parityscope.reports.generator import generate_json_report

            json_report = generate_json_report(result)
            json_path.write_text(json_report, encoding="utf-8")
            generated_files.append(str(json_path))
            if verbose:
                console.print(f"  JSON report: {json_path}")

        if "pdf" in formats:
            pdf_path = out_dir / f"{cfg.model_name}_audit.pdf"
            try:
                from parityscope.reports.pdf_report import generate_pdf_report

                generate_pdf_report(result, output_path=str(pdf_path))
                generated_files.append(str(pdf_path))
                if verbose:
                    console.print(f"  PDF report:  {pdf_path}")
            except ImportError:
                display_warning("PDF generation requires reportlab. Skipping PDF output.")

        # ----- Step 9: Regulatory-specific reports -----
        if cfg.jurisdiction:
            reg_json_path = out_dir / f"{cfg.model_name}_{cfg.jurisdiction}_compliance.json"
            from parityscope.reports.generator import generate_json_report as gen_json

            compliance_report = gen_json(result)
            reg_json_path.write_text(compliance_report, encoding="utf-8")
            generated_files.append(str(reg_json_path))
            if verbose:
                console.print(f"  Compliance report: {reg_json_path}")

        # ----- Step 10: Evidence package -----
        evidence_path = out_dir / f"{cfg.model_name}_evidence.json"
        evidence = {
            "audit_result": result.to_dict(),
            "configuration": {
                "model_name": cfg.model_name,
                "protected_attributes": cfg.protected_attributes,
                "jurisdiction": cfg.jurisdiction,
                "clinical_domain": cfg.clinical_domain,
                "intersectional": cfg.intersectional,
                "bootstrap": cfg.bootstrap,
            },
        }
        if root_cause_results is not None:
            evidence["root_cause"] = (
                root_cause_results.to_dict()
                if hasattr(root_cause_results, "to_dict")
                else str(root_cause_results)
            )
        if recommendation_results is not None:
            evidence["recommendations"] = [
                {
                    "id": r.id, "severity": r.severity.value, "title": r.title,
                    "description": r.description, "disparity": r.disparity,
                    "regulatory_risk": r.regulatory_risk,
                    "clinical_impact": r.clinical_impact,
                    "priority_score": r.priority_score,
                }
                if hasattr(r, "id") else str(r)
                for r in recommendation_results
            ]

        evidence_path.write_text(json.dumps(evidence, indent=2, default=str), encoding="utf-8")
        generated_files.append(str(evidence_path))

        # ----- Step 11: Summary -----
        if verbose:
            console.print()
            display_success("Audit complete.")
            console.print()
            console.print("[bold]Generated files:[/bold]")
            for f in generated_files:
                console.print(f"  {f}")
            console.print()

    except Exception as exc:
        display_error(str(exc))
        if verbose:
            console.print_exception()
        sys.exit(1)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _resolve_config(
    *,
    data: str | None,
    config_path: str | None,
    model_name: str | None,
    attributes: tuple[str, ...],
    jurisdiction: str | None,
    domain: str | None,
    output_dir: str,
    output_format: str,
    intersectional: bool,
    bootstrap: bool,
    include_root_cause: bool,
    include_recommendations: bool,
) -> AuditConfig:
    """Merge CLI flags with an optional config file.

    CLI flags override config file values when both are provided.
    """
    if config_path:
        cfg = load_config(config_path)
    else:
        cfg = AuditConfig()

    # CLI overrides
    if data:
        cfg.data_path = data
    if model_name:
        cfg.model_name = model_name
    if attributes:
        cfg.protected_attributes = list(attributes)
    if jurisdiction:
        cfg.jurisdiction = jurisdiction
    if domain:
        cfg.clinical_domain = domain
    if output_dir != "./parityscope_output" or not config_path:
        cfg.output_dir = output_dir

    cfg.intersectional = intersectional
    cfg.bootstrap = bootstrap
    cfg.include_root_cause = include_root_cause
    cfg.include_recommendations = include_recommendations

    # Resolve output formats
    cfg.output_formats = _resolve_formats_list(output_format)

    return cfg


def _resolve_formats_list(fmt: str) -> list[str]:
    """Convert a format option string to a list of formats."""
    if fmt in ("both", "all"):
        return ["pdf", "json"]
    return [fmt]


def _resolve_formats(formats: list[str]) -> list[str]:
    """Normalise and deduplicate format list."""
    out = []
    for f in formats:
        if f in ("both", "all"):
            out.extend(["pdf", "json"])
        else:
            out.append(f)
    return list(dict.fromkeys(out))  # deduplicate preserving order


def _load_data(path: str) -> pd.DataFrame:
    """Load a dataset from CSV or Excel.

    Args:
        path: Path to the data file.

    Returns:
        A pandas DataFrame.

    Raises:
        click.BadParameter: If the file format is unsupported.
    """
    p = Path(path)
    suffix = p.suffix.lower()

    try:
        if suffix == ".csv":
            return pd.read_csv(p)
        elif suffix in (".xls", ".xlsx"):
            return pd.read_excel(p)
        elif suffix == ".parquet":
            return pd.read_parquet(p)
        else:
            # Try CSV as fallback
            return pd.read_csv(p)
    except Exception as exc:
        raise click.BadParameter(
            f"Could not load data from '{path}': {exc}"
        ) from exc
