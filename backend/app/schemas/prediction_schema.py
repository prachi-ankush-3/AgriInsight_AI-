from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


CropType = str


class PredictionRequest(BaseModel):
    crop: CropType
    city: str | None = Field(default=None, max_length=120)


class WeatherRead(BaseModel):
    city: str
    temperature: float
    humidity: int
    rain_probability: int
    recommendation: str


class PredictionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    crop: str
    image_name: str
    disease: str
    confidence: float
    treatment: str
    weather: str
    created_at: datetime


class PredictionDetail(PredictionRead):
    image_url: str | None = None
    report_url: str | None = None


class PredictionListData(BaseModel):
    items: list[PredictionDetail]