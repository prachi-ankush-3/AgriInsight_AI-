from datetime import datetime, timedelta, timezone

import jwt

from ..config import get_settings


class JWTError(Exception):
    pass


def create_access_token(subject: str, expires_delta: timedelta | None = None) -> tuple[str, datetime]:
    settings = get_settings()
    now = datetime.now(timezone.utc)
    expire = now + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
    payload = {"sub": subject, "iat": now, "exp": expire}
    token = jwt.encode(payload, settings.secret_key, algorithm="HS256")
    return token, expire


def decode_access_token(token: str) -> dict[str, object]:
    settings = get_settings()
    try:
        return jwt.decode(token, settings.secret_key, algorithms=["HS256"])
    except jwt.InvalidTokenError as exc:
        raise JWTError("Invalid token") from exc