from fastapi import APIRouter, Depends, HTTPException, Query, status, Body, Request, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from crud import module as module_crud
from auth.security import authenticate_user, create_access_token, create_refresh_token, refresh_access_token
from auth.dependencies import get_current_user
from crud.user import create_user
from db.session import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def login(
        response: Response,
        email: str = Body(),
        password: str = Body(),
        db: AsyncSession = Depends(get_db)
):
    user = await authenticate_user(db, email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token = await create_access_token(data={"sub": user.email, "id_user": user.id_user})
    refresh_token = await create_refresh_token(data={"sub": user.email, "id_user": user.id_user})
    response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite="strict",
            max_age=604800,
            path="/api/auth/refresh"
        )
    return {"access_token": access_token, "token_type": "bearer"}
    

@router.post("/register")
async def register(
        response: Response,
        name: str = Body(),
        email: str = Body(),
        password: str = Body(),
        phone: str | None = Body(None),
        surname: str | None = Body(None),
        patronymic: str | None = Body(None),
        about: str | None = Body(None),
        db: AsyncSession = Depends(get_db)
):
    exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Failed creating user"
    )
    try:
        user = await create_user(db, name, email, password, phone, surname, patronymic, about)
        if not user:
            raise exception
        access_token = await create_access_token(data={"sub": user.email, "id_user": user.id_user})
        refresh_token = await create_refresh_token(data={"sub": user.email, "id_user": user.id_user})
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite="strict",
            max_age=604800,
            path="/api/auth/refresh"
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except:
        raise exception

@router.post("/refresh")
async def refresh(
        request: Request,
        response: Response,
        db: AsyncSession = Depends(get_db)
):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No refresh token provided"
        )
    try:
        new_access_token, new_refresh_token = await refresh_access_token(db, refresh_token)
        response.set_cookie(
            key="refresh_token",
            value=new_refresh_token,
            httponly=True,
            secure=True,
            samesite="strict",
            max_age=604800,
            path="/api/auth/refresh"
        )
        return {"access_token": new_access_token, "token_type": "bearer"}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed refreshing token"
        )