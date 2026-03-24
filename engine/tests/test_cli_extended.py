"""Tests for CLI commands using Click's CliRunner."""

import json

import numpy as np
import pandas as pd
import pytest
from click.testing import CliRunner

from parityscope.cli.main import cli


@pytest.fixture
def cli_runner():
    return CliRunner()


@pytest.fixture
def sample_csv(tmp_path):
    """Create a sample CSV for CLI testing."""
    rng = np.random.default_rng(42)
    n = 200
    y_true = rng.integers(0, 2, n)
    y_pred = y_true.copy()
    flip = rng.random(n) < 0.2
    y_pred[flip] = 1 - y_pred[flip]

    df = pd.DataFrame({
        "labels": y_true,
        "predictions": y_pred,
        "scores": np.clip(y_pred + rng.normal(0, 0.2, n), 0, 1),
        "race": rng.choice(["White", "Black", "Hispanic"], n, p=[0.5, 0.3, 0.2]),
        "sex": rng.choice(["Male", "Female"], n),
    })
    csv_path = tmp_path / "test_data.csv"
    df.to_csv(csv_path, index=False)
    return str(csv_path)


class TestAuditCommand:
    """Tests for `parityscope audit`."""

    def test_audit_basic(self, cli_runner, sample_csv, tmp_path):
        result = cli_runner.invoke(cli, [
            "audit",
            "--data", sample_csv,
            "--model-name", "test_model",
            "--attributes", "race",
            "--attributes", "sex",
            "--jurisdiction", "eu-ai-act",
            "--domain", "diagnosis",
            "--output-dir", str(tmp_path / "output"),
            "--format", "json",
            "--no-intersectional",
            "--no-bootstrap",
            "--no-root-cause",
            "--no-recommendations",
            "--quiet",
        ])
        assert result.exit_code == 0, f"CLI failed: {result.output}\n{result.exception}"

    def test_audit_missing_data(self, cli_runner, tmp_path):
        result = cli_runner.invoke(cli, [
            "audit",
            "--model-name", "test_model",
            "--attributes", "race",
            "--output-dir", str(tmp_path / "output"),
            "--quiet",
        ])
        # Should fail because --data is missing
        assert result.exit_code != 0

    def test_audit_missing_model_name(self, cli_runner, sample_csv, tmp_path):
        result = cli_runner.invoke(cli, [
            "audit",
            "--data", sample_csv,
            "--attributes", "race",
            "--output-dir", str(tmp_path / "output"),
            "--quiet",
        ])
        assert result.exit_code != 0


class TestProfileCommand:
    """Tests for `parityscope profile`."""

    def test_profile_basic(self, cli_runner, sample_csv):
        result = cli_runner.invoke(cli, [
            "profile",
            "--data", sample_csv,
        ])
        assert result.exit_code == 0, f"CLI failed: {result.output}\n{result.exception}"

    def test_profile_with_output(self, cli_runner, sample_csv, tmp_path):
        out_path = str(tmp_path / "profile.json")
        result = cli_runner.invoke(cli, [
            "profile",
            "--data", sample_csv,
            "--output", out_path,
        ])
        assert result.exit_code == 0, f"CLI failed: {result.output}\n{result.exception}"
        data = json.loads((tmp_path / "profile.json").read_text())
        assert "total_rows" in data


class TestInitCommand:
    """Tests for `parityscope init`."""

    def test_init_creates_config(self, cli_runner, tmp_path):
        out_path = str(tmp_path / "parityscope.yaml")
        result = cli_runner.invoke(cli, [
            "init",
            "--output", out_path,
        ])
        assert result.exit_code == 0, f"CLI failed: {result.output}\n{result.exception}"
        assert (tmp_path / "parityscope.yaml").exists()

    def test_init_no_overwrite(self, cli_runner, tmp_path):
        out_path = str(tmp_path / "parityscope.yaml")
        # Create the file first
        (tmp_path / "parityscope.yaml").write_text("existing")
        result = cli_runner.invoke(cli, [
            "init",
            "--output", out_path,
        ])
        # Should fail without --force
        assert result.exit_code != 0

    def test_init_force_overwrite(self, cli_runner, tmp_path):
        out_path = str(tmp_path / "parityscope.yaml")
        (tmp_path / "parityscope.yaml").write_text("existing")
        result = cli_runner.invoke(cli, [
            "init",
            "--output", out_path,
            "--force",
        ])
        assert result.exit_code == 0


class TestMonitorRunCommand:
    """Tests for `parityscope monitor run`."""

    def test_monitor_run(self, cli_runner, sample_csv, tmp_path):
        db_path = str(tmp_path / "monitor.db")
        result = cli_runner.invoke(cli, [
            "monitor", "run",
            "--data", sample_csv,
            "--db", db_path,
            "--model-name", "test_model",
            "--attributes", "race",
            "--attributes", "sex",
            "--jurisdiction", "eu-ai-act",
        ])
        assert result.exit_code == 0, f"CLI failed: {result.output}\n{result.exception}"
        assert (tmp_path / "monitor.db").exists()

    def test_monitor_run_missing_model(self, cli_runner, sample_csv, tmp_path):
        db_path = str(tmp_path / "monitor.db")
        result = cli_runner.invoke(cli, [
            "monitor", "run",
            "--data", sample_csv,
            "--db", db_path,
            "--attributes", "race",
        ])
        assert result.exit_code != 0

    def test_monitor_status(self, cli_runner, sample_csv, tmp_path):
        db_path = str(tmp_path / "monitor.db")
        # First run to create data
        cli_runner.invoke(cli, [
            "monitor", "run",
            "--data", sample_csv,
            "--db", db_path,
            "--model-name", "test_model",
            "--attributes", "race",
        ])
        # Then check status
        result = cli_runner.invoke(cli, [
            "monitor", "status",
            "--db", db_path,
            "--model-name", "test_model",
        ])
        assert result.exit_code == 0
