from fastapi import APIRouter, Depends

from ..dependencies import get_current_user, get_weather_service
from ..schemas.common_schema import ApiResponse
from ..services.weather_service import WeatherService
from ..utils.response import success_response


router = APIRouter(tags=["weather"])


@router.get("/weather", response_model=ApiResponse)
async def get_weather(
    city: str | None = None,
    current_user=Depends(get_current_user),
    weather_service: WeatherService = Depends(get_weather_service),
):
    weather = await weather_service.get_weather(city)
    return success_response("Weather fetched successfully", weather.model_dump())