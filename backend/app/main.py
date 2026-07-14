from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from .ai.predictor import DiseasePredictor
from .config import get_settings
from .database import async_session_factory, init_db
from .routers import auth, history, prediction, reports, weather
from .services.auth_service import AuthService
from .services.report_service import ReportService
from .services.treatment_service import TreatmentService
from .services.weather_service import WeatherService
from .utils.logger import RequestLoggingMiddleware, configure_logging
from .utils.response import error_response


settings = get_settings()
configure_logging(settings.log_level)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    async with async_session_factory() as db:
        await AuthService(db).seed_demo_user(settings.demo_username, settings.demo_email, settings.demo_password)
    app.state.predictor = DiseasePredictor(settings.ai_dir)
    app.state.predictor.load_models()
    app.state.treatment_service = TreatmentService(settings.treatments_file)
    app.state.weather_service = WeatherService(settings)
    app.state.report_service = ReportService(settings)
    yield


app = FastAPI(title=settings.app_name, version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RequestLoggingMiddleware)

app.mount("/uploads", StaticFiles(directory=str(settings.upload_dir)), name="uploads")

app.include_router(auth.router)
app.include_router(prediction.router)
app.include_router(history.router)
app.include_router(reports.router)
app.include_router(weather.router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    first_error = exc.errors()[0] if exc.errors() else {"msg": "Validation error"}
    message = first_error.get("msg", "Validation error")
    return JSONResponse(status_code=422, content=error_response(message))


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    message = exc.detail if isinstance(exc.detail, str) else "Request failed"
    return JSONResponse(status_code=exc.status_code, content=error_response(message))


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content=error_response("Internal server error"))


@app.get("/health")
async def health_check():
    return {"success": True, "message": "Service is healthy", "data": {"status": "ok"}}