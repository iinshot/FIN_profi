import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.session import engine, get_db
from sqlalchemy import select, text
from contextlib import asynccontextmanager
from models import Base
from routes.module import router as module_module
from routes.answer import router as module_answer
from routes.question import router as module_question
from routes.quiz import router as module_quiz
from routes.article import router as module_article
from routes.user import router as module_user
from routes.auth import router as module_auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with engine.begin() as conn:
        result = await conn.execute(text("SELECT COUNT(*) FROM modules"))
        count = result.scalar()
        
        if count == 0:
            print("База пустая. Начинаю заливку данных из demo.sql...")
            sql_file_path = os.path.join(os.path.dirname(__file__), "db", "demo.sql")
            
            try:
                with open(sql_file_path, "r", encoding="utf-8") as file:
                    sql_script = file.read()
                
                statements = sql_script.split(';')
                for statement in statements:
                    if statement.strip():
                        await conn.execute(text(statement))
                        
                print("Тестовые данные успешно загружены!")
            except Exception as e:
                print(f"Ошибка при выполнении скрипта: {e}")

    yield 
    await engine.dispose()


origins = [
    "http://localhost:3000",   # React, Next.js
    "http://localhost:5173",   # Vite
    "http://localhost:8080",   # Vue CLI
    "http://localhost:4200",   # Angular
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:4200",
]

app = FastAPI(root_path="/api", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allows specific origins (or ["*"] for all)
    allow_credentials=True,         # Allows cookies to be included in requests
    allow_methods=["*"],            # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # Allows all headers
)

app.include_router(module_module)
app.include_router(module_answer)
app.include_router(module_question)
app.include_router(module_quiz)
app.include_router(module_article)
app.include_router(module_user)
app.include_router(module_auth)

@app.get("/")
async def root():
    return {"message": "Hello"}