# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ParityScope is a dual-stack monorepo: a **Python fairness audit engine** (`engine/`) and a **Next.js marketing website** (root `src/`). The engine provides CLI, REST API, and library interfaces for auditing ML models for demographic bias.

## Commands

### Python Engine (run from `engine/`)

```bash
# Install for development
pip install -e ".[dev]"

# Run all tests
pytest

# Run a single test file
pytest tests/test_metrics.py

# Run a specific test
pytest tests/test_metrics.py::test_function_name -v

# Lint
ruff check src/ tests/

# Type check
mypy src/

# Build package
python -m build
```

### Next.js Website (run from repo root)

```bash
# Install dependencies
pnpm install

# Dev server
pnpm dev

# Production build (includes sitemap generation)
pnpm build

# Lint
pnpm lint
```

## Architecture

### Python Engine (`engine/src/parityscope/`)

The engine follows a pipeline architecture: **data loading → audit → metrics → analysis → reports**.

- **`audit/`** — Core audit engine. `FairnessAudit` orchestrates the pipeline; `AuditResult` is the central data object passed downstream. Includes intersectional analysis and subgroup discovery.
- **`metrics/`** — 15 fairness metrics (classification parity, calibration, effect size, bootstrap CIs, statistical power). Metrics are registered via `registry.py`.
- **`rootcause/`** — Bias root-cause analysis: proxy detection, label bias, feature importance, representation gaps.
- **`recommendations/`** — Generates mitigation strategies, gap analysis, priority ranking, and tradeoff assessment.
- **`reports/`** — PDF and checklist generation for regulatory frameworks (EU AI Act, FDA premarket, Section 1557).
- **`monitoring/`** — Continuous audit monitoring with SQLite persistence, drift detection, alerting, and trend analysis.
- **`simulation/`** — What-if interventions for bias mitigation scenarios.
- **`data/`** — Data loaders, profiling, FHIR integration, model intake, validation.
- **`regulations/`** — Regulatory framework mapping (EU AI Act, FDA, Section 1557, South Korea, Taiwan).
- **`cli/commands/`** — Click-based CLI with subcommands: audit, monitor, profile, report, simulate, init, serve, license.
- **`api/`** — FastAPI REST server with Pydantic models.

Entry points defined in `pyproject.toml`:
- `parityscope` → CLI
- `parityscope-api` → REST API server

### Next.js Website (`src/`)

- **`app/`** — Next.js App Router with routes for product, solutions, regulations, pricing, contact, etc.
- **`components/`** — Layout (nav, footer) and form components (react-hook-form + zod).
- **`lib/`** — Utilities for email (Resend API), MDX processing, site config, validation schemas.

Key config: TypeScript path alias `@/*` maps to `src/*`. MDX support configured in `next.config.ts`.

## Python Configuration

- Python ≥3.10, line length 100 (ruff)
- mypy strict mode enabled
- Optional extras: `[fhir]` for healthcare data, `[onnx]` for model loading, `[all]` for both
- Test fixtures in `engine/tests/conftest.py` (seeded synthetic data)

## Environment Variables

See `.env.example` for website env vars (Resend API key, email addresses, SITE_URL).
