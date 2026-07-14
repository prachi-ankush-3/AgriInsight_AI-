from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status

from ..dependencies import get_current_user, get_prediction_service
from ..schemas.common_schema import ApiResponse
from ..schemas.prediction_schema import CropType, PredictionDetail
from ..services.prediction_service import PredictionService
from ..utils.response import success_response


router = APIRouter(tags=["prediction"])


@router.post("/predict", response_model=ApiResponse, status_code=status.HTTP_201_CREATED)
async def predict_disease(
    crop: str = Form(...),
    image: UploadFile = File(...),
    city: str | None = Form(default=None),
    current_user=Depends(get_current_user),
    prediction_service: PredictionService = Depends(get_prediction_service),
):
    prediction = await prediction_service.create_prediction(current_user, crop, image, city)
    data = prediction_service.serialize_prediction(prediction)
    return success_response("Prediction Successful", data.model_dump())