"""FHIR R4 Patient resource parser for extracting demographics.

Extracts race, ethnicity, sex, age group, and language from FHIR
Patient resources and Bundle JSON, including US Core extensions.
"""

from __future__ import annotations

import json
from datetime import date, datetime
from pathlib import Path

import pandas as pd


def _age_group_from_birthdate(birth_date_str: str | None) -> str | None:
    """Compute age group from FHIR birthDate string (YYYY-MM-DD)."""
    if not birth_date_str:
        return None
    try:
        birth = datetime.strptime(birth_date_str[:10], "%Y-%m-%d").date()
        today = date.today()
        age = today.year - birth.year - ((today.month, today.day) < (birth.month, birth.day))
        if age < 18:
            return "0-17"
        elif age < 40:
            return "18-39"
        elif age < 60:
            return "40-59"
        elif age < 80:
            return "60-79"
        else:
            return "80+"
    except (ValueError, TypeError):
        return None


def _extract_us_core_extension(
    extensions: list[dict], url_suffix: str
) -> str | None:
    """Extract value from US Core Race or Ethnicity extension."""
    for ext in extensions:
        ext_url = ext.get("url", "")
        if url_suffix in ext_url:
            # Look for ombCategory sub-extension
            sub_exts = ext.get("extension", [])
            for sub in sub_exts:
                if sub.get("url") == "ombCategory":
                    coding = sub.get("valueCoding", {})
                    return coding.get("display") or coding.get("code")
            # Fallback: look for text sub-extension
            for sub in sub_exts:
                if sub.get("url") == "text":
                    return sub.get("valueString")
    return None


def extract_patient_demographics(patient: dict) -> dict:
    """Extract demographics from a single FHIR Patient resource.

    Handles:
    - sex/gender from Patient.gender
    - race from US Core Race extension
    - ethnicity from US Core Ethnicity extension
    - age_group from Patient.birthDate
    - language from Patient.communication

    Args:
        patient: FHIR Patient resource as a dict.

    Returns:
        Dict with keys: patient_id, sex, race, ethnicity, age_group, language.
        Missing values are None.
    """
    result: dict[str, str | None] = {
        "patient_id": patient.get("id"),
        "sex": patient.get("gender"),
        "race": None,
        "ethnicity": None,
        "age_group": None,
        "language": None,
    }

    # Age group from birthDate
    result["age_group"] = _age_group_from_birthdate(patient.get("birthDate"))

    # US Core extensions for race and ethnicity
    extensions = patient.get("extension", [])
    if extensions:
        result["race"] = _extract_us_core_extension(extensions, "us-core-race")
        result["ethnicity"] = _extract_us_core_extension(extensions, "us-core-ethnicity")

    # Language from communication
    communications = patient.get("communication", [])
    if communications:
        lang = communications[0].get("language", {})
        codings = lang.get("coding", [])
        if codings:
            result["language"] = codings[0].get("code") or codings[0].get("display")

    return result


def parse_fhir_bundle(source: str | Path | dict) -> pd.DataFrame:
    """Parse a FHIR Bundle and extract demographics from Patient resources.

    Args:
        source: Path to a FHIR Bundle JSON file, or a dict containing
            the Bundle. Can also be a JSON string.

    Returns:
        DataFrame with columns: patient_id, sex, race, ethnicity, age_group, language.
        One row per Patient resource found in the Bundle.
    """
    if isinstance(source, (str, Path)):
        source_path = Path(source)
        if source_path.exists():
            with open(source_path) as f:
                bundle = json.load(f)
        else:
            # Try parsing as JSON string
            bundle = json.loads(str(source))
    elif isinstance(source, dict):
        bundle = source
    else:
        raise TypeError(f"Expected str, Path, or dict, got {type(source)}")

    # Extract Patient resources from Bundle entries
    patients: list[dict] = []
    entries = bundle.get("entry", [])
    for entry in entries:
        resource = entry.get("resource", {})
        if resource.get("resourceType") == "Patient":
            patients.append(extract_patient_demographics(resource))

    if not patients:
        raise ValueError(
            "No Patient resources found in the FHIR Bundle. "
            "Ensure the Bundle contains entries with resourceType 'Patient'."
        )

    return pd.DataFrame(patients)
