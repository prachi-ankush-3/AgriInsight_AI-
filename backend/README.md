# AgriInsight AI Backend

This backend is a modular FastAPI implementation for the AgriInsight AI frontend.

## What is included

- JWT authentication
- SQLite persistence with SQLAlchemy ORM
- Crop prediction workflow for Strawberry and Sapota
- Scan history APIs
- Weather lookup service
- PDF report generation

## Run locally

1. Create and activate a Python 3.12 environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start the API:

```bash
uvicorn app.main:app --reload
```

## Important files

- `app/main.py` wires the application together.
- `app/config.py` reads environment variables.
- `app/database.py` configures SQLite and the async session.
- `app/routers/` contains the REST endpoints.
- `app/services/` holds business logic.
- `app/ai/predictor.py` loads the crop models when they are available.

## Notes

- Place the trained model files in `app/ai/`.
- Place any future logo asset in `app/assets/` if you want to replace the built-in PDF header mark.
- The backend ships with a safe fallback predictor so the API can still run even if the `.keras` files are not present yet.