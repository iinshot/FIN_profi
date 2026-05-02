from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from crud import quiz as quiz_crud
from db.session import get_db

router = APIRouter(prefix="/quizzes", tags=["quizzes"])

@router.get("/")
async def get_all_quizzes(
        skip: int = Query(0, ge=0),
        limit: int = Query(100, ge=1, le=1000),
        db: AsyncSession = Depends(get_db)
):
    return await quiz_crud.get_all_quizzes(db, skip=skip, limit=limit)

@router.get("/{id_quiz}")
async def get_quiz(id_quiz: int, db: AsyncSession = Depends(get_db)):
    quiz = await quiz_crud.get_quiz(db, id_quiz=id_quiz)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz

@router.post("/")
async def create_quiz(
        name: str,
        db: AsyncSession = Depends(get_db)
):
    return await quiz_crud.create_quiz(db, name=name)

@router.put("/{id_quiz}")
async def update_quiz(
        id_quiz: int,
        name: str | None = None,
        db: AsyncSession = Depends(get_db)
):
    if name is None:
        raise HTTPException(status_code=400, detail="No fields to update")

    quiz = await quiz_crud.update_quiz(db, id_quiz=id_quiz, name=name)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz

@router.delete("/{id_quiz}")
async def delete_quiz(id_quiz: int, db: AsyncSession = Depends(get_db)):
    deleted = await quiz_crud.delete_quiz(db, id_quiz=id_quiz)
    if not deleted:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return {"detail": "Quiz deleted"}