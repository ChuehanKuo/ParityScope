"""Main CLI entry point for ParityScope.

Registers all subcommands and provides the top-level ``parityscope`` group.
"""

from __future__ import annotations

import click

from parityscope.cli.display import console, display_welcome


@click.group()
@click.version_option(package_name="parityscope")
def cli():
    """ParityScope -- Healthcare AI Fairness Compliance Toolkit

    Audit, monitor, and mitigate bias in clinical AI systems.
    """
    pass


# Register subcommands
from parityscope.cli.commands.audit_cmd import audit  # noqa: E402
from parityscope.cli.commands.profile_cmd import profile  # noqa: E402
from parityscope.cli.commands.report_cmd import report  # noqa: E402
from parityscope.cli.commands.simulate_cmd import simulate  # noqa: E402
from parityscope.cli.commands.init_cmd import init  # noqa: E402
from parityscope.cli.commands.monitor_cmd import monitor  # noqa: E402
from parityscope.cli.commands.serve_cmd import serve  # noqa: E402
from parityscope.cli.commands.license_cmd import license  # noqa: E402

cli.add_command(audit)
cli.add_command(profile)
cli.add_command(report)
cli.add_command(simulate)
cli.add_command(init)
cli.add_command(monitor)
cli.add_command(serve)
cli.add_command(license)
