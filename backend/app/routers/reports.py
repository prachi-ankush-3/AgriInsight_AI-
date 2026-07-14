from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import FileResponse

from ..dependencies import get_current_user, get_history_service, get_report_service
from ..services.history_service import HistoryService
from ..services.report_service import ReportService


router = APIRouter(tags=["reports"])


@router.get("/reports/{prediction_id}/download", name="download_report")
async def download_report(
    prediction_id: int,
    request: Request,
    current_user=Depends(get_current_user),
    history_service: HistoryService = Depends(get_history_service),
    report_service: ReportService = Depends(get_report_service),
):
    prediction = await history_service.get_prediction(current_user.id, prediction_id)
    if prediction is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prediction not found")

    pdf_path = await report_service.generate_report(prediction, current_user)
    return FileResponse(
        path=str(pdf_path),
        media_type="application/pdf",
        filename=pdf_path.name,
    )