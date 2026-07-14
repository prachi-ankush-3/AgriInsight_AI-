from fastapi import APIRouter, Depends, HTTPException, status

from ..dependencies import get_auth_service, get_current_user
from ..schemas.auth_schema import AuthData, LoginRequest, RegisterRequest, TokenData, UserRead
from ..schemas.common_schema import ApiResponse
from ..services.auth_service import AuthService
from ..utils.response import success_response


router = APIRouter(tags=["auth"])


@router.post("/auth/register", response_model=ApiResponse, status_code=status.HTTP_201_CREATED)
async def register_user(
    payload: RegisterRequest,
    auth_service: AuthService = Depends(get_auth_service),
):
    try:
        user = await auth_service.register_user(payload)
        token, expires_at = auth_service.build_token(user)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    data = AuthData(
        user=UserRead.model_validate(user),
        token=TokenData(access_token=token, expires_at=expires_at),
    )
    return success_response("Registration Successful", data.model_dump())


@router.post("/auth/login", response_model=ApiResponse)
async def login_user(
    payload: LoginRequest,
    auth_service: AuthService = Depends(get_auth_service),
):
    try:
        user = await auth_service.login_user(payload)
        token, expires_at = auth_service.build_token(user)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)) from exc

    data = AuthData(
        user=UserRead.model_validate(user),
        token=TokenData(access_token=token, expires_at=expires_at),
    )
    return success_response("Login Successful", data.model_dump())


@router.get("/auth/me", response_model=ApiResponse)
async def get_me(current_user=Depends(get_current_user)):
    return success_response("User profile fetched successfully", UserRead.model_validate(current_user).model_dump())