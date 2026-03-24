"""Schedule management for monitoring runs.

Provides simple schedule definitions and a check for whether
a new audit is due. Production deployments should use their
own scheduler (cron, Airflow) and call MonitoringSession directly.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone


@dataclass(frozen=True)
class MonitoringSchedule:
    """Schedule definition."""

    frequency: str  # daily, weekly, monthly
    time_of_day: str = "02:00"  # HH:MM UTC
    day_of_week: int | None = None  # 0=Monday, for weekly
    day_of_month: int | None = None  # for monthly


def parse_schedule(frequency: str) -> MonitoringSchedule:
    """Parse a frequency string into a MonitoringSchedule."""
    freq_lower = frequency.lower().strip()
    if freq_lower == "daily":
        return MonitoringSchedule(frequency="daily")
    elif freq_lower == "weekly":
        return MonitoringSchedule(frequency="weekly", day_of_week=0)
    elif freq_lower == "monthly":
        return MonitoringSchedule(frequency="monthly", day_of_month=1)
    else:
        raise ValueError(f"Unknown frequency '{frequency}'. Use daily, weekly, or monthly.")


def is_due(schedule: MonitoringSchedule, last_run: str | None) -> bool:
    """Check if a monitoring run is due based on last run time.

    Args:
        schedule: The monitoring schedule.
        last_run: ISO timestamp of the last run, or None if never run.

    Returns:
        True if a new run is due.
    """
    if last_run is None:
        return True

    now = datetime.now(timezone.utc)
    try:
        last = datetime.fromisoformat(last_run.replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        return True

    if schedule.frequency == "daily":
        return (now - last) >= timedelta(hours=23)
    elif schedule.frequency == "weekly":
        return (now - last) >= timedelta(days=6, hours=23)
    elif schedule.frequency == "monthly":
        return (now - last) >= timedelta(days=27)
    else:
        return True


def next_run_time(schedule: MonitoringSchedule, last_run: str | None = None) -> str:
    """Compute the next scheduled run time as an ISO timestamp."""
    now = datetime.now(timezone.utc)

    if last_run:
        try:
            last = datetime.fromisoformat(last_run.replace("Z", "+00:00"))
        except (ValueError, AttributeError):
            last = now
    else:
        last = now

    if schedule.frequency == "daily":
        next_dt = last + timedelta(days=1)
    elif schedule.frequency == "weekly":
        next_dt = last + timedelta(weeks=1)
    elif schedule.frequency == "monthly":
        next_dt = last + timedelta(days=30)
    else:
        next_dt = last + timedelta(days=1)

    # Apply time_of_day
    try:
        h, m = schedule.time_of_day.split(":")
        next_dt = next_dt.replace(hour=int(h), minute=int(m), second=0, microsecond=0)
    except (ValueError, AttributeError):
        pass

    return next_dt.isoformat()
