from fastapi import FastAPI
import uvicorn
from db.session import engine, get_db
from sqlalchemy import select
from contextlib import asynccontextmanager
from models import Base
from routes.module import router as module_router
from routes.answer import router as module_answer

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(root_path="/api", lifespan=lifespan)

app.include_router(module_router)
app.include_router(module_answer)

@app.get("/")
async def root():
    return {"message": "Hello"}