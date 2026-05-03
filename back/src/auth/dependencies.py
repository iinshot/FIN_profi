import os
from dotenv import load_dotenv
from typing import Annotated, Optional
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security.utils import get_authorization_scheme_param
from sqlalchemy.ext.asyncio import AsyncSession
import jwt
from jwt.exceptions import InvalidTokenError
from db.session import get_db
from crud.user import get_user_by_email

load_dotenv()
SECRET_KEY = os.environ.get("SECRET_KEY", "8e89816372df3a00951701a1a3fa4a0d0d4463fe0c511177253be2100d8c8150")
ALGORITHM = os.environ.get("ALGORITHM", "HS256")

class OAuth2PasswordBearerJSON(OAuth2):
    async def __call__(self, request: Request) -> Optional[str]:
        authorization = request.headers.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return param

oauth2_scheme = OAuth2PasswordBearerJSON()

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None or (payload.get("type") != "access"):
            raise credentials_exception    
        return await get_user_by_email(db, email)
    except InvalidTokenError:
        raise credentials_exception