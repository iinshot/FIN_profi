from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from crud import module as module_crud
from db.session import get_db

router = APIRouter(prefix="/modules", tags=["modules"])

@router.get("/{id_module}")
async def get_module(id_module: int, db: AsyncSession = Depends(get_db)):
    module = await module_crud.get_module(db, id_module=id_module)
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module

@router.get("/")
async def get_all_modules(
        skip: int = Query(0, ge=0),
        limit: int = Query(100, ge=1, le=1000),
        db: AsyncSession = Depends(get_db)
):
    modules = await module_crud.get_all_modules(db, skip=skip, limit=limit)
    return modules


@router.post("/")
async def create_module(
        name: str,
        id_quiz: int | None = None,
        db: AsyncSession = Depends(get_db)
):
    module = await module_crud.create_module(db, name=name, id_quiz=id_quiz)
    return module

@router.put("/{id_module}")
async def update_module(
        id_module: int,
        name: str | None = None,
        id_quiz: int | None = None,
        db: AsyncSession = Depends(get_db)
):
    kwargs = {}
    if name is not None:
        kwargs["name"] = name
    if id_quiz is not None:
        kwargs["id_quiz"] = id_quiz

    if not kwargs:
        raise HTTPException(status_code=400, detail="No fields to update")

    module = await module_crud.update_module(db, id_module=id_module, **kwargs)
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module

@router.delete("/{id_module}")
async def delete_module(id_module: int, db: AsyncSession = Depends(get_db)):
    deleted = await module_crud.delete_module(db, id_module=id_module)
    if not deleted:
        raise HTTPException(status_code=404, detail="Module not found")
    return {"detail": "Module deleted"}