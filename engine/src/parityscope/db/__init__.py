"""Database layer for audit history and monitoring.

Stores audit results in SQLite for local usage or can be configured
for PostgreSQL in production. Provides the foundation for continuous
monitoring and drift detection.
"""

from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy import Column, DateTime, Float, Integer, String, Text, create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker


class Base(DeclarativeBase):
    pass


class AuditRecord(Base):
    """Persisted audit result for monitoring and history."""

    __tablename__ = "audit_records"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    model_name = Column(String, nullable=False, index=True)
    audit_id = Column(String, nullable=False, unique=True)
    timestamp = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    jurisdiction = Column(String, nullable=True)
    clinical_domain = Column(String, nullable=True)
    overall_fairness = Column(String, nullable=False)
    total_samples = Column(Integer, nullable=False)
    total_metrics = Column(Integer, nullable=False)
    fair_count = Column(Integer, nullable=False)
    marginal_count = Column(Integer, nullable=False)
    unfair_count = Column(Integer, nullable=False)
    max_disparity = Column(Float, nullable=False)
    protected_attributes = Column(Text, nullable=False)  # JSON
    result_json = Column(Text, nullable=False)  # Full result as JSON


class AlertRecord(Base):
    """Alerting record for threshold breaches."""

    __tablename__ = "alert_records"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    model_name = Column(String, nullable=False, index=True)
    audit_id = Column(String, nullable=False)
    timestamp = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    metric_name = Column(String, nullable=False)
    disparity = Column(Float, nullable=False)
    threshold = Column(Float, nullable=False)
    fairness_level = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    resolved = Column(Integer, default=0)


class AuditStore:
    """Persistent storage for audit results.

    Usage:
        store = AuditStore("sqlite:///parityscope.db")
        store.save(audit_result)
        history = store.get_history("my_model")
    """

    def __init__(self, database_url: str = "sqlite:///parityscope.db"):
        self.engine = create_engine(database_url, echo=False)
        Base.metadata.create_all(self.engine)
        self._session_factory = sessionmaker(bind=self.engine)

    def _session(self) -> Session:
        return self._session_factory()

    def save(self, result) -> str:
        """Save an AuditResult to the database. Returns the record ID."""
        from parityscope.audit.result import AuditResult

        result_dict = result.to_dict()
        max_disp = max(
            (m.disparity for m in result.metric_results), default=0.0
        )

        record = AuditRecord(
            model_name=result.model_name,
            audit_id=result.audit_id,
            timestamp=datetime.fromisoformat(result.timestamp),
            jurisdiction=result.jurisdiction,
            clinical_domain=result.clinical_domain,
            overall_fairness=result.overall_fairness.value,
            total_samples=result.total_samples,
            total_metrics=len(result.metric_results),
            fair_count=len(result.fair_metrics),
            marginal_count=len(result.marginal_metrics),
            unfair_count=len(result.unfair_metrics),
            max_disparity=max_disp,
            protected_attributes=json.dumps(list(result.protected_attributes)),
            result_json=json.dumps(result_dict, default=str),
        )

        with self._session() as session:
            session.add(record)
            session.commit()
            return record.id

    def save_alerts(self, result) -> list[str]:
        """Generate and save alerts for unfair/marginal metrics."""
        alert_ids = []
        with self._session() as session:
            for m in result.metric_results:
                if m.fairness_level.value in ("unfair", "marginal"):
                    alert_id = str(uuid.uuid4())
                    alert = AlertRecord(
                        id=alert_id,
                        model_name=result.model_name,
                        audit_id=result.audit_id,
                        metric_name=m.metric_name,
                        disparity=m.disparity,
                        threshold=m.threshold,
                        fairness_level=m.fairness_level.value,
                        message=(
                            f"{m.display_name} has disparity {m.disparity:.4f} "
                            f"(threshold: {m.threshold:.4f}) — {m.fairness_level.value.upper()}"
                        ),
                    )
                    session.add(alert)
                    alert_ids.append(alert_id)
            session.commit()
        return alert_ids

    def get_history(
        self,
        model_name: str,
        limit: int = 100,
    ) -> list[dict]:
        """Get audit history for a model, ordered by timestamp descending."""
        with self._session() as session:
            records = (
                session.query(AuditRecord)
                .filter(AuditRecord.model_name == model_name)
                .order_by(AuditRecord.timestamp.desc())
                .limit(limit)
                .all()
            )
            return [
                {
                    "id": r.id,
                    "audit_id": r.audit_id,
                    "model_name": r.model_name,
                    "timestamp": r.timestamp.isoformat() if r.timestamp else None,
                    "jurisdiction": r.jurisdiction,
                    "clinical_domain": r.clinical_domain,
                    "overall_fairness": r.overall_fairness,
                    "total_samples": r.total_samples,
                    "total_metrics": r.total_metrics,
                    "fair_count": r.fair_count,
                    "marginal_count": r.marginal_count,
                    "unfair_count": r.unfair_count,
                    "max_disparity": r.max_disparity,
                }
                for r in records
            ]

    def get_result(self, audit_id: str) -> dict | None:
        """Get the full result JSON for a specific audit."""
        with self._session() as session:
            record = (
                session.query(AuditRecord)
                .filter(AuditRecord.audit_id == audit_id)
                .first()
            )
            if record is None:
                return None
            return json.loads(record.result_json)

    def get_alerts(
        self,
        model_name: str | None = None,
        unresolved_only: bool = True,
        limit: int = 100,
    ) -> list[dict]:
        """Get alert records."""
        with self._session() as session:
            query = session.query(AlertRecord)
            if model_name:
                query = query.filter(AlertRecord.model_name == model_name)
            if unresolved_only:
                query = query.filter(AlertRecord.resolved == 0)
            records = query.order_by(AlertRecord.timestamp.desc()).limit(limit).all()
            return [
                {
                    "id": r.id,
                    "model_name": r.model_name,
                    "audit_id": r.audit_id,
                    "timestamp": r.timestamp.isoformat() if r.timestamp else None,
                    "metric_name": r.metric_name,
                    "disparity": r.disparity,
                    "threshold": r.threshold,
                    "fairness_level": r.fairness_level,
                    "message": r.message,
                    "resolved": bool(r.resolved),
                }
                for r in records
            ]

    def resolve_alert(self, alert_id: str) -> bool:
        """Mark an alert as resolved."""
        with self._session() as session:
            alert = session.query(AlertRecord).filter(AlertRecord.id == alert_id).first()
            if alert is None:
                return False
            alert.resolved = 1
            session.commit()
            return True

    def get_drift_series(self, model_name: str, metric_name: str) -> list[dict]:
        """Get time-series data for a specific metric across audits.

        Useful for plotting fairness drift over time.
        """
        with self._session() as session:
            records = (
                session.query(AuditRecord)
                .filter(AuditRecord.model_name == model_name)
                .order_by(AuditRecord.timestamp.asc())
                .all()
            )

        series = []
        for r in records:
            result_dict = json.loads(r.result_json)
            for m in result_dict.get("metric_results", []):
                if m["metric_name"] == metric_name:
                    series.append({
                        "timestamp": r.timestamp.isoformat() if r.timestamp else None,
                        "audit_id": r.audit_id,
                        "disparity": m["disparity"],
                        "fairness_level": m["fairness_level"],
                    })
                    break
        return series

    def list_models(self) -> list[dict]:
        """List all models with their latest audit status."""
        with self._session() as session:
            from sqlalchemy import func

            subq = (
                session.query(
                    AuditRecord.model_name,
                    func.max(AuditRecord.timestamp).label("latest"),
                )
                .group_by(AuditRecord.model_name)
                .subquery()
            )
            records = (
                session.query(AuditRecord)
                .join(
                    subq,
                    (AuditRecord.model_name == subq.c.model_name)
                    & (AuditRecord.timestamp == subq.c.latest),
                )
                .all()
            )
            return [
                {
                    "model_name": r.model_name,
                    "latest_audit": r.timestamp.isoformat() if r.timestamp else None,
                    "overall_fairness": r.overall_fairness,
                    "total_metrics": r.total_metrics,
                    "unfair_count": r.unfair_count,
                }
                for r in records
            ]
