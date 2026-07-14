from pathlib import Path

from ..config import Settings
from ..models.prediction import Prediction
from ..models.user import User
from ..utils.pdf_generator import generate_pdf_report


class ReportService:
    def __init__(self, settings: Settings):
        self.settings = settings

    async def generate_report(self, prediction: Prediction, user: User) -> Path:
        image_path = Path(prediction.image_path)
        logo_path = self.settings.ai_dir / "logo.png"
        return generate_pdf_report(
            prediction=prediction,
            user=user,
            output_dir=self.settings.report_dir,
            image_path=image_path if image_path.exists() else None,
            logo_path=logo_path if logo_path.exists() else None,
        )