from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

engine = create_async_engine('postgresql+asyncpg://postgres:postgres@db/dummies_investments')

SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine, expire_on_commit=False)

async def get_db() -> AsyncSession:
    async with SessionLocal() as db:
        yield db