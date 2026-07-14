from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.user import User
from ..schemas.auth_schema import LoginRequest, RegisterRequest
from ..utils.jwt_handler import create_access_token

import bcrypt


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_by_email(self, email: str) -> User | None:
        result = await self.db.execute(select(User).where(User.email == email.lower().strip()))
        return result.scalar_one_or_none()

    async def register_user(self, payload: RegisterRequest) -> User:
        normalized_email = payload.email.lower().strip()
        existing_user = await self.get_user_by_email(normalized_email)
        if existing_user is not None:
            raise ValueError("Email already registered")

        user = User(
            username=payload.username.strip(),
            email=normalized_email,
            hashed_password=hash_password(payload.password),
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def login_user(self, payload: LoginRequest) -> User:
        user = await self.get_user_by_email(payload.email)
        if user is None or not verify_password(payload.password, user.hashed_password):
            raise ValueError("Invalid email or password")
        return user

    async def seed_demo_user(self, username: str, email: str, password: str) -> User:
        existing_user = await self.get_user_by_email(email)
        if existing_user is not None:
            return existing_user

        demo_user = User(
            username=username.strip(),
            email=email.lower().strip(),
            hashed_password=hash_password(password),
        )
        self.db.add(demo_user)
        await self.db.commit()
        await self.db.refresh(demo_user)
        return demo_user

    def build_token(self, user: User) -> tuple[str, object]:
        return create_access_token(str(user.id))