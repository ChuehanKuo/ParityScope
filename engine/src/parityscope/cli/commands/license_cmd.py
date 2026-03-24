"""License management CLI commands."""

from __future__ import annotations

import click

from parityscope.cli.display import console, display_error, display_success


@click.group()
def license():
    """Manage your ParityScope license."""
    pass


@license.command()
@click.argument("key")
@click.option("--org", default="", help="Organization name.")
def activate(key, org):
    """Activate a license key."""
    from parityscope.licensing import activate as do_activate

    result = do_activate(key, organization=org)

    if result.valid:
        display_success(f"License activated!")
        console.print(f"  Tier: [bold]{result.tier}[/bold]")
        console.print(f"  Organization: {result.organization or 'Not specified'}")
        console.print(f"  Max models: {result.max_models if result.max_models > 0 else 'Unlimited'}")
        console.print(f"  Max samples: {result.max_samples if result.max_samples > 0 else 'Unlimited':,}")
        console.print(f"  Monitoring: {'Yes' if result.monitoring_enabled else 'No'}")
        if result.expires_at:
            console.print(f"  Expires: {result.expires_at[:10]}")
    else:
        display_error(result.message)


@license.command()
def status():
    """Show current license status."""
    from parityscope.licensing import get_license

    info = get_license()
    if info is None:
        console.print("[yellow]No license activated.[/yellow]")
        console.print("Run: parityscope license activate PS-TRIAL-xxxxxxxx")
        console.print("Get a key at: https://parityscope.com/developers")
        return

    if info.valid:
        console.print(f"[green bold]License Active[/green bold]")
    else:
        console.print(f"[red bold]License Invalid[/red bold]: {info.message}")

    console.print(f"  Tier: {info.tier}")
    console.print(f"  Organization: {info.organization or 'Not specified'}")
    console.print(f"  Activated: {info.activated_at[:10] if info.activated_at else 'N/A'}")
    if info.expires_at:
        console.print(f"  Expires: {info.expires_at[:10]}")


@license.command()
def deactivate():
    """Remove the local license."""
    from parityscope.licensing import deactivate as do_deactivate

    if do_deactivate():
        display_success("License removed.")
    else:
        console.print("No license to remove.")
