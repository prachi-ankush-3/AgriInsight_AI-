from datetime import datetime
from pathlib import Path
from textwrap import wrap

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

from ..models.prediction import Prediction
from ..models.user import User


def _draw_wrapped_text(pdf: canvas.Canvas, text: str, x: float, y: float, width: float, line_height: float = 14) -> float:
    max_chars = max(int(width / 6), 1)
    lines = wrap(text, width=max_chars) or [text]
    current_y = y
    for line in lines:
        pdf.drawString(x, current_y, line)
        current_y -= line_height
    return current_y


def generate_pdf_report(
    prediction: Prediction,
    user: User,
    output_dir: Path,
    image_path: Path | None = None,
    logo_path: Path | None = None,
) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    file_path = output_dir / f"agriinsight_report_{prediction.id}.pdf"

    pdf = canvas.Canvas(str(file_path), pagesize=A4)
    page_width, page_height = A4

    pdf.setFillColor(colors.HexColor("#082016"))
    pdf.rect(0, 0, page_width, page_height, fill=1, stroke=0)

    pdf.setFillColor(colors.HexColor("#13402d"))
    pdf.rect(0, page_height - 110, page_width, 110, fill=1, stroke=0)

    pdf.setFillColor(colors.HexColor("#b8f3c1"))
    pdf.circle(52, page_height - 54, 18, fill=1, stroke=0)
    pdf.setFillColor(colors.HexColor("#082016"))
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawCentredString(52, page_height - 58, "AI")

    pdf.setFillColor(colors.white)
    pdf.setFont("Helvetica-Bold", 22)
    pdf.drawString(86, page_height - 44, "AgriInsight AI")
    pdf.setFont("Helvetica", 10)
    pdf.drawString(86, page_height - 62, "Crop disease scan report")

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(40, page_height - 135, f"User: {user.username} ({user.email})")
    pdf.setFont("Helvetica", 10)
    pdf.drawString(40, page_height - 152, f"Generated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    preview_top = page_height - 185
    pdf.setFillColor(colors.HexColor("#0e2b1d"))
    pdf.roundRect(38, preview_top - 220, page_width - 76, 220, 16, fill=1, stroke=0)

    if image_path and image_path.exists():
        pdf.drawImage(ImageReader(str(image_path)), 50, preview_top - 205, width=170, height=170, preserveAspectRatio=True, mask="auto")
    else:
        pdf.setFillColor(colors.HexColor("#174b34"))
        pdf.rect(50, preview_top - 205, 170, 170, fill=1, stroke=0)
        pdf.setFillColor(colors.white)
        pdf.setFont("Helvetica", 10)
        pdf.drawCentredString(135, preview_top - 120, "No image available")

    text_x = 240
    text_y = preview_top - 30
    pdf.setFillColor(colors.white)
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(text_x, text_y, f"Disease: {prediction.disease}")
    pdf.setFont("Helvetica", 11)
    pdf.drawString(text_x, text_y - 24, f"Crop: {prediction.crop.title()}")
    pdf.drawString(text_x, text_y - 42, f"Confidence: {prediction.confidence:.2f}%")
    pdf.drawString(text_x, text_y - 60, f"Image: {prediction.image_name}")

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(40, preview_top - 250, "Treatment Recommendation")
    pdf.setFont("Helvetica", 10)
    treatment_bottom = _draw_wrapped_text(pdf, prediction.treatment, 40, preview_top - 268, page_width - 80)

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(40, treatment_bottom - 14, "Weather Recommendation")
    pdf.setFont("Helvetica", 10)
    weather_bottom = _draw_wrapped_text(pdf, prediction.weather, 40, treatment_bottom - 32, page_width - 80)

    pdf.setFont("Helvetica-Oblique", 9)
    pdf.setFillColor(colors.HexColor("#b8f3c1"))
    pdf.drawString(40, 38, "AgriInsight AI • Generated report for agricultural diagnostics")

    pdf.save()
    return file_path