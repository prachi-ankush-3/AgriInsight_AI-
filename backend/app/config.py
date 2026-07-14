from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=BASE_DIR / ".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "AgriInsight AI"
    secret_key: str = "change-this-in-production"
    access_token_expire_minutes: int = 60
    database_url: str = "sqlite+aiosqlite:///./agriinsight.db"
    frontend_origin: str = "http://localhost:5173"
    default_city: str = "Hyderabad"
    openweather_api_key: str = ""
    openweather_base_url: str = "https://api.openweathermap.org/data/2.5/weather"
    log_level: str = "INFO"
    demo_username: str = "Admin"
    demo_email: str = "admin@agriinsight.ai"
    demo_password: str = "Agri1234!"
    upload_dir: Path = BASE_DIR / "app" / "uploads"
    report_dir: Path = BASE_DIR / "app" / "reports"
    ai_dir: Path = BASE_DIR / "app" / "ai"
    treatments_file: Path = BASE_DIR / "app" / "utils" / "treatments.json"

    @property
    def strawberry_model_path(self) -> Path:
        return self.ai_dir / "strawberry_model.keras"

    @property
    def sapota_model_path(self) -> Path:
        return self.ai_dir / "sapota_model.keras"

    @property
    def strawberry_classes_path(self) -> Path:
        return self.ai_dir / "strawberry_classes.json"

    @property
    def sapota_classes_path(self) -> Path:
        return self.ai_dir / "sapota_classes.json"

    def ensure_directories(self) -> None:
        for path in (self.upload_dir, self.report_dir, self.ai_dir, self.treatments_file.parent):
            path.mkdir(parents=True, exist_ok=True)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    settings = Settings()
    settings.ensure_directories()
    return settings