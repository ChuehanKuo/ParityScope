"""ParityScope REST API — FastAPI server for cloud deployment.

Run:
    uvicorn parityscope.api:app --reload
    # or
    parityscope serve --port 8000
"""

from parityscope.api.server import app

__all__ = ["app"]
