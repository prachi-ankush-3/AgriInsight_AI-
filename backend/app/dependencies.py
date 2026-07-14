from fastapi import Depends, Request, Security, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .config import get_settings
from .database import get_db
from .models.user import User
from .services.auth_service import AuthService
from .services.history_service import HistoryService
from .services.prediction_service import PredictionService
from .services.report_service import ReportService
from .services.weather_service import WeatherService
from .utils.jwt_handler import decode_access_token


security = HTTPBearer(auto_error=False)


def get_auth_service(db: AsyncSession = Depends(get_db)) -> AuthService:
    return AuthService(db)


def get_history_service(db: AsyncSession = Depends(get_db)) -> HistoryService:
    return HistoryService(db)


def get_prediction_service(request: Request, db: AsyncSession = Depends(get_db)) -> PredictionService:
    settings = get_settings()
    return PredictionService(
        db=db,
        predictor=request.app.state.predictor,
        treatment_service=request.app.state.treatment_service,
        weather_service=request.app.state.weather_service,
        settings=settings,
    )


def get_report_service(request: Request) -> ReportService:
    return request.app.state.report_service


def get_weather_service(request: Request) -> WeatherService:
    return request.app.state.weather_service


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Security(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    try:
        payload = decode_access_token(credentials.credentials)
        user_id = payload.get("sub")
        if user_id is None:
            raise ValueError("Missing subject")
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token") from exc

    result = await db.execute(select(User).where(User.id == int(user_id)))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return user