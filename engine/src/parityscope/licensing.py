"""License key validation for ParityScope SDK.

Validates license keys on first use. Keys are stored locally
after validation so the SDK works offline after activation.

License key format: PS-{TIER}-{RANDOM} (e.g., PS-PRO-a1b2c3d4e5f6)
Tiers: TRIAL, STARTER, PRO, ENTERPRISE
"""

from __future__ import annotations

import hashlib
import json
import os
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


_CONFIG_DIR = Path.home() / ".parityscope"
_LICENSE_FILE = _CONFIG_DIR / "license.json"

# Tier limits
_TIER_LIMITS = {
    "TRIAL": {"max_models": 1, "max_samples": 5000, "days": 30, "monitoring": False},
    "STARTER": {"max_models": 5, "max_samples": 50000, "days": 365, "monitoring": False},
    "PRO": {"max_models": 25, "max_samples": 500000, "days": 365, "monitoring": True},
    "ENTERPRISE": {"max_models": -1, "max_samples": -1, "days": -1, "monitoring": True},
}


@dataclass
class LicenseInfo:
    """Validated license information."""

    key: str
    tier: str
    organization: str
    activated_at: str
    expires_at: str | None
    max_models: int
    max_samples: int
    monitoring_enabled: bool
    valid: bool
    message: str


def _validate_key_format(key: str) -> tuple[bool, str]:
    """Validate the license key format locally."""
    if not key or not isinstance(key, str):
        return False, "No license key provided."

    key = key.strip().upper()

    if not key.startswith("PS-"):
        return False, "Invalid key format. Keys start with PS-."

    parts = key.split("-")
    if len(parts) != 3:
        return False, "Invalid key format. Expected PS-{TIER}-{KEY}."

    tier = parts[1]
    if tier not in _TIER_LIMITS:
        return False, f"Invalid tier '{tier}'. Valid: TRIAL, STARTER, PRO, ENTERPRISE."

    key_part = parts[2]
    if len(key_part) < 8:
        return False, "Invalid key. Key portion too short."

    return True, tier


def _compute_key_hash(key: str) -> str:
    """Hash the key for local storage (don't store raw keys)."""
    return hashlib.sha256(key.encode()).hexdigest()[:16]


def activate(key: str, organization: str = "") -> LicenseInfo:
    """Activate a license key.

    Validates the key format and stores it locally for offline use.

    Args:
        key: License key (e.g., PS-PRO-a1b2c3d4e5f6).
        organization: Organization name for the license.

    Returns:
        LicenseInfo with activation status.
    """
    valid, tier_or_msg = _validate_key_format(key)
    if not valid:
        return LicenseInfo(
            key=key[:10] + "...", tier="NONE", organization=organization,
            activated_at="", expires_at=None, max_models=0, max_samples=0,
            monitoring_enabled=False, valid=False, message=tier_or_msg,
        )

    tier = tier_or_msg
    limits = _TIER_LIMITS[tier]
    now = datetime.now(timezone.utc)
    expires = None
    if limits["days"] > 0:
        from datetime import timedelta
        expires = (now + timedelta(days=limits["days"])).isoformat()

    info = LicenseInfo(
        key=key[:10] + "...",
        tier=tier,
        organization=organization,
        activated_at=now.isoformat(),
        expires_at=expires,
        max_models=limits["max_models"],
        max_samples=limits["max_samples"],
        monitoring_enabled=limits["monitoring"],
        valid=True,
        message=f"License activated. Tier: {tier}.",
    )

    # Store locally
    _CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    license_data = {
        "key_hash": _compute_key_hash(key),
        "tier": tier,
        "organization": organization,
        "activated_at": info.activated_at,
        "expires_at": info.expires_at,
    }
    _LICENSE_FILE.write_text(json.dumps(license_data, indent=2))

    return info


def get_license() -> LicenseInfo | None:
    """Get the currently activated license, or None if not activated."""
    if not _LICENSE_FILE.exists():
        return None

    try:
        data = json.loads(_LICENSE_FILE.read_text())
        tier = data.get("tier", "TRIAL")
        limits = _TIER_LIMITS.get(tier, _TIER_LIMITS["TRIAL"])

        # Check expiry
        expires = data.get("expires_at")
        if expires:
            exp_dt = datetime.fromisoformat(expires)
            if datetime.now(timezone.utc) > exp_dt:
                return LicenseInfo(
                    key="expired", tier=tier,
                    organization=data.get("organization", ""),
                    activated_at=data.get("activated_at", ""),
                    expires_at=expires,
                    max_models=0, max_samples=0, monitoring_enabled=False,
                    valid=False, message="License expired. Please renew at parityscope.com.",
                )

        return LicenseInfo(
            key=data.get("key_hash", "")[:10] + "...",
            tier=tier,
            organization=data.get("organization", ""),
            activated_at=data.get("activated_at", ""),
            expires_at=expires,
            max_models=limits["max_models"],
            max_samples=limits["max_samples"],
            monitoring_enabled=limits["monitoring"],
            valid=True,
            message=f"Active license. Tier: {tier}.",
        )
    except (json.JSONDecodeError, KeyError):
        return None


def check_license(n_samples: int = 0, require_monitoring: bool = False) -> LicenseInfo:
    """Check if the current license allows the requested operation.

    Args:
        n_samples: Number of samples in the dataset.
        require_monitoring: Whether monitoring features are needed.

    Returns:
        LicenseInfo. Check .valid to see if the operation is allowed.

    Note:
        If no license is found, returns a TRIAL-equivalent that allows
        basic usage so users can evaluate the product.
    """
    info = get_license()

    if info is None:
        # No license — allow basic usage for evaluation
        return LicenseInfo(
            key="unlicensed", tier="EVAL", organization="",
            activated_at="", expires_at=None,
            max_models=1, max_samples=1000, monitoring_enabled=False,
            valid=True,
            message=(
                "No license key found. Running in evaluation mode (1 model, 1K samples). "
                "Get a license at https://parityscope.com/developers"
            ),
        )

    if not info.valid:
        return info

    if info.max_samples > 0 and n_samples > info.max_samples:
        return LicenseInfo(
            key=info.key, tier=info.tier, organization=info.organization,
            activated_at=info.activated_at, expires_at=info.expires_at,
            max_models=info.max_models, max_samples=info.max_samples,
            monitoring_enabled=info.monitoring_enabled,
            valid=False,
            message=(
                f"Dataset size ({n_samples:,}) exceeds {info.tier} tier limit "
                f"({info.max_samples:,} samples). Upgrade at parityscope.com."
            ),
        )

    if require_monitoring and not info.monitoring_enabled:
        return LicenseInfo(
            key=info.key, tier=info.tier, organization=info.organization,
            activated_at=info.activated_at, expires_at=info.expires_at,
            max_models=info.max_models, max_samples=info.max_samples,
            monitoring_enabled=info.monitoring_enabled,
            valid=False,
            message=(
                f"Continuous monitoring requires PRO or ENTERPRISE tier. "
                f"Current tier: {info.tier}. Upgrade at parityscope.com."
            ),
        )

    return info


def deactivate() -> bool:
    """Remove the local license."""
    if _LICENSE_FILE.exists():
        _LICENSE_FILE.unlink()
        return True
    return False
