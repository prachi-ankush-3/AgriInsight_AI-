from fastapi import APIRouter, Depends, HTTPException, Request, status

from ..dependencies import get_current_user, get_history_service, get_prediction_service
from ..schemas.common_schema import ApiResponse
from ..services.history_service import HistoryService
from ..services.prediction_service import PredictionService
from ..utils.response import success_response


router = APIRouter(tags=["history"])


@router.get("/history", response_model=ApiResponse)
async def list_history(
    request: Request,
    current_user=Depends(get_current_user),
    history_service: HistoryService = Depends(get_history_service),
    prediction_service: PredictionService = Depends(get_prediction_service),
):
    items = await history_service.list_predictions(current_user.id)
    data = [prediction_service.serialize_prediction(item, request).model_dump() for item in items]
    return success_response("History fetched successfully", {"items": data})


@router.get("/history/{prediction_id}", response_model=ApiResponse)
async def get_history_item(
    prediction_id: int,
    request: Request,
    current_user=Depends(get_current_user),
    history_service: HistoryService = Depends(get_history_service),
    prediction_service: PredictionService = Depends(get_prediction_service),
):
    prediction = await history_service.get_prediction(current_user.id, prediction_id)
    if prediction is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prediction not found")

    data = prediction_service.serialize_prediction(prediction, request).model_dump()
    return success_response("Prediction fetched successfully", data)


@router.delete("/history/{prediction_id}", response_model=ApiResponse)
async def delete_history_item(
    prediction_id: int,
    current_user=Depends(get_current_user),
    history_service: HistoryService = Depends(get_history_service),
):
    deleted = await history_service.delete_prediction(current_user.id, prediction_id)
    if deleted is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prediction not found")

    return success_response("Prediction deleted successfully", {"deleted": True, "id": prediction_id})