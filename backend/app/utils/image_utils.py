from io import BytesIO
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile
from PIL import Image, UnidentifiedImageError


ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
CONTENT_TYPE_SUFFIX = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}


async def save_validated_image(upload_file: UploadFile, target_dir: Path) -> tuple[Path, str]:
    if upload_file.content_type not in ALLOWED_CONTENT_TYPES:
        raise ValueError("Invalid Image")

    file_bytes = await upload_file.read()
    if not file_bytes:
        raise ValueError("Invalid Image")

    try:
        image = Image.open(BytesIO(file_bytes))
        image.verify()
    except (UnidentifiedImageError, OSError, ValueError) as exc:
        raise ValueError("Invalid Image") from exc

    suffix = Path(upload_file.filename or "").suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
        suffix = CONTENT_TYPE_SUFFIX.get(upload_file.content_type, ".jpg")

    target_dir.mkdir(parents=True, exist_ok=True)
    filename = f"{uuid4().hex}{suffix}"
    file_path = target_dir / filename
    file_path.write_bytes(file_bytes)
    return file_path, filename