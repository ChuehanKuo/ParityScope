"""CLI command: parityscope serve — start the REST API server."""

from __future__ import annotations

import click

from parityscope.cli.display import console


@click.command()
@click.option("--host", default="0.0.0.0", show_default=True, help="Bind address")
@click.option("--port", default=8000, show_default=True, type=int, help="Port number")
@click.option("--reload", is_flag=True, help="Enable auto-reload for development")
def serve(host: str, port: int, reload: bool) -> None:
    """Start the ParityScope REST API server."""
    console.print(f"[bold green]Starting ParityScope API[/] on {host}:{port}")
    from parityscope.api.server import run_server

    run_server(host=host, port=port, reload=reload)
