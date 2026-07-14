from pathlib import Path

from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..config import get_settings
from ..models.prediction import Prediction


class HistoryService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.settings = get_settings()

    async def list_predictions(self, user_id: int) -> list[Prediction]:
        result = await self.db.execute(
            select(Prediction)
            .where(Prediction.user_id == user_id)
            .order_by(desc(Prediction.created_at), desc(Prediction.id))
        )
        return list(result.scalars().all())

    async def get_prediction(self, user_id: int, prediction_id: int) -> Prediction | None:
        result = await self.db.execute(
            select(Prediction).where(Prediction.user_id == user_id, Prediction.id == prediction_id)
        )
        return result.scalar_one_or_none()

    async def delete_prediction(self, user_id: int, prediction_id: int) -> Prediction | None:
        prediction = await self.get_prediction(user_id, prediction_id)
        if prediction is None:
            return None

        image_path = Path(prediction.image_path)
        report_path = self.settings.report_dir / f"agriinsight_report_{prediction.id}.pdf"

        if image_path.exists():
            image_path.unlink(missing_ok=True)

        if report_path.exists():
            report_path.unlink(missing_ok=True)

        await self.db.delete(prediction)
        await self.db.commit()
        return prediction