"""The ``parityscope init`` command — generate a sample configuration file.

Usage::

    parityscope init

Creates a ``parityscope.yaml`` file in the current directory with
helpful comments explaining every option.
"""

from __future__ import annotations

import sys
from pathlib import Path

import click

from parityscope.cli.config import generate_sample_config
from parityscope.cli.display import display_error, display_success, display_warning, display_welcome


@click.command()
@click.option(
    "--output",
    type=click.Path(),
    default="parityscope.yaml",
    show_default=True,
    help="Output path for the sample config file.",
)
@click.option(
    "--force",
    is_flag=True,
    default=False,
    help="Overwrite an existing config file.",
)
def init(output: str, force: bool) -> None:
    """Generate a sample ParityScope configuration file.

    Creates a well-commented YAML config in the current directory
    that you can customise for your audit.
    """
    try:
        display_welcome()

        out_path = Path(output)

        if out_path.exists() and not force:
            display_warning(
                f"'{output}' already exists. Use --force to overwrite."
            )
            sys.exit(1)

        generate_sample_config(out_path)
        display_success(f"Sample configuration written to {output}")
        click.echo()
        click.echo("Next steps:")
        click.echo(f"  1. Edit {output} to match your model and dataset")
        click.echo(f"  2. Run:  parityscope audit --config {output}")

    except Exception as exc:
        display_error(str(exc))
        sys.exit(1)
