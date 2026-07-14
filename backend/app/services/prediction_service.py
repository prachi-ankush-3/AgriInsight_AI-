from __future__ import annotations

import asyncio
from dataclasses import dataclass
from pathlib import Path

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..config import Settings
from ..models.prediction import Prediction
from ..models.user import User
from ..schemas.prediction_schema import CropType, PredictionDetail
from ..services.treatment_service import TreatmentService
from ..services.weather_service import WeatherService
from ..utils.image_utils import save_validated_image
from ..ai.predictor import DiseasePredictor, PredictionOutput


@dataclass(slots=True)
class PredictionArtifacts:
    prediction: Prediction
    image_path: Path


class PredictionService:
    def __init__(
        self,
        db: AsyncSession,
        predictor: DiseasePredictor,
        treatment_service: TreatmentService,
        weather_service: WeatherService,
        settings: Settings,
    ):
        self.db = db
        self.predictor = predictor
        self.treatment_service = treatment_service
        self.weather_service = weather_service
        self.settings = settings

    def _normalize_crop(self, crop: str) -> str:
        normalized = crop.lower().strip()
        if normalized not in {"strawberry", "sapota"}:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported crop")
        return normalized

    async def create_prediction(
        self,
        user: User,
        crop: str,
        image: UploadFile,
        city: str | None = None,
    ) -> Prediction:
        normalized_crop = self._normalize_crop(crop)

        try:
            image_path, image_name = await save_validated_image(image, self.settings.upload_dir)
        except ValueError as exc:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

        weather = await self.weather_service.get_weather(city)
        prediction_output: PredictionOutput = await self.predictor.predict(normalized_crop, image_path)
        treatment_text = self.treatment_service.format_treatment_text(prediction_output.disease)
        weather_text = weather.recommendation

        record = Prediction(
            user_id=user.id,
            crop=normalized_crop,
            image_name=image_name,
            image_path=str(image_path),
            disease=prediction_output.disease,
            confidence=prediction_output.confidence,
            treatment=treatment_text,
            weather=(
                f"{weather.city}: {weather.temperature:.1f}°C, humidity {weather.humidity}%, "
                f"rain chance {weather.rain_probability}%. {weather_text}"
            ),
        )

        self.db.add(record)
        await self.db.commit()
        await self.db.refresh(record)
        return record

    def serialize_prediction(self, prediction: Prediction, request=None) -> PredictionDetail:
        image_url = None
        report_url = None

        if request is not None:
            try:
                image_url = str(request.url_for("uploads", path=prediction.image_name))
            except Exception:
                image_url = None

            try:
                report_url = str(request.url_for("download_report", prediction_id=prediction.id))
            except Exception:
                report_url = None

        return PredictionDetail(
            id=prediction.id,
            user_id=prediction.user_id,
            crop=prediction.crop,
            image_name=prediction.image_name,
            disease=prediction.disease,
            confidence=prediction.confidence,
            treatment=prediction.treatment,
            weather=prediction.weather,
            created_at=prediction.created_at,
            image_url=image_url,
            report_url=report_url,
        )