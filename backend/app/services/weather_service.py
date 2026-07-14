from __future__ import annotations

import httpx

from ..config import Settings
from ..schemas.prediction_schema import WeatherRead


class WeatherService:
    def __init__(self, settings: Settings):
        self.settings = settings

    def _fallback_weather(self, city: str) -> WeatherRead:
        return WeatherRead(
            city=city,
            temperature=29.0,
            humidity=68,
            rain_probability=35,
            recommendation="Weather API is unavailable. Use caution before spraying pesticides.",
        )

    def _build_recommendation(self, rain_probability: int, humidity: int) -> str:
        if rain_probability >= 60:
            return "Rain expected. Avoid spraying pesticides today."
        if humidity >= 80:
            return "High humidity detected. Monitor fungal spread and improve airflow."
        return "Weather looks suitable for field inspection and crop monitoring."

    def _estimate_rain_probability(self, data: dict[str, object]) -> int:
        rain_data = data.get("rain")
        if isinstance(rain_data, dict):
            volume = rain_data.get("1h") or rain_data.get("3h")
            if isinstance(volume, (int, float)):
                if volume >= 5:
                    return 80
                if volume >= 2:
                    return 60
                return 35

        weather_items = data.get("weather")
        if isinstance(weather_items, list) and weather_items:
            description = str(weather_items[0].get("main", "")).lower()
            if "rain" in description or "storm" in description:
                return 75
            if "cloud" in description:
                return 40

        return 20

    async def get_weather(self, city: str | None = None) -> WeatherRead:
        target_city = (city or self.settings.default_city).strip() or self.settings.default_city
        if not self.settings.openweather_api_key:
            return self._fallback_weather(target_city)

        params = {
            "q": target_city,
            "appid": self.settings.openweather_api_key,
            "units": "metric",
        }

        try:
            async with httpx.AsyncClient(timeout=10) as client:
                response = await client.get(self.settings.openweather_base_url, params=params)
                response.raise_for_status()
                data = response.json()
        except Exception:
            return self._fallback_weather(target_city)

        main_block = data.get("main", {})
        temp = float(main_block.get("temp", 0.0))
        humidity = int(main_block.get("humidity", 0))
        rain_probability = self._estimate_rain_probability(data)

        return WeatherRead(
            city=target_city,
            temperature=temp,
            humidity=humidity,
            rain_probability=rain_probability,
            recommendation=self._build_recommendation(rain_probability, humidity),
        )