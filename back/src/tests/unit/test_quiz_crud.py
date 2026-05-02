import pytest
from crud import quiz

class TestQuizCRUD:
    @pytest.mark.asyncio
    async def test_create_quiz(self, db_session):
        """Тест создания теста"""
        data = await quiz.create_quiz(
            session=db_session,
            name="Test Quiz"
        )

        assert data.id_quiz is not None
        assert data.name == "Test Quiz"

    @pytest.mark.asyncio
    async def test_get_quiz(self, db_session, test_quiz):
        """Тест получения теста по ID"""
        data = await quiz.get_quiz(db_session, test_quiz.id_quiz)

        assert data is not None
        assert data.id_quiz == test_quiz.id_quiz
        assert data.name == test_quiz.name

    @pytest.mark.asyncio
    async def test_get_all_quizzes(self, db_session):
        """Тест получения всех тестов"""
        await quiz.create_quiz(
            session=db_session,
            name="First Quiz"
        )

        await quiz.create_quiz(
            session=db_session,
            name="Second Quiz"
        )

        quizzes = await quiz.get_all_quizzes(db_session)

        assert len(quizzes) >= 2
        assert any(q.name == "First Quiz" for q in quizzes)
        assert any(q.name == "Second Quiz" for q in quizzes)

    @pytest.mark.asyncio
    async def test_update_quiz(self, db_session, test_quiz):
        """Тест обновления теста"""
        updated_quiz = await quiz.update_quiz(
            db_session,
            test_quiz.id_quiz,
            name="Updated Quiz Name"
        )

        assert updated_quiz is not None
        assert updated_quiz.name == "Updated Quiz Name"

    @pytest.mark.asyncio
    async def test_delete_quiz(self, db_session, test_quiz):
        """Тест удаления теста"""
        result = await quiz.delete_quiz(db_session, test_quiz.id_quiz)
        deleted_quiz = await quiz.get_quiz(db_session, test_quiz.id_quiz)

        assert result is True
        assert deleted_quiz is None