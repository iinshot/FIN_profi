import pytest
from crud import question
from models.Question import QuestionType

class TestQuestionCRUD:
    @pytest.mark.asyncio
    async def test_create_question(self, db_session):
        """Тест создания вопроса"""
        data = await question.create_question(
            session=db_session,
            question_text="What is Python?",
            question_type=QuestionType.RADIO
        )

        assert data.id_question is not None
        assert data.question_text == "What is Python?"
        assert data.question_type == QuestionType.RADIO

    @pytest.mark.asyncio
    async def test_create_question_checkbox(self, db_session):
        """Тест создания вопроса типа checkbox"""
        data = await question.create_question(
            session=db_session,
            question_text="Select all programming languages?",
            question_type=QuestionType.CHECKBOX
        )

        assert data.id_question is not None
        assert data.question_text == "Select all programming languages?"
        assert data.question_type == QuestionType.CHECKBOX

    @pytest.mark.asyncio
    async def test_get_question(self, db_session, test_question):
        """Тест получения вопроса по ID"""
        data = await question.get_question(db_session, test_question.id_question)

        assert data is not None
        assert data.id_question == test_question.id_question
        assert data.question_text == test_question.question_text
        assert data.question_type == test_question.question_type

    @pytest.mark.asyncio
    async def test_get_all_questions(self, db_session):
        """Тест получения всех вопросов"""
        await question.create_question(
            session=db_session,
            question_text="First Question",
            question_type=QuestionType.RADIO
        )

        await question.create_question(
            session=db_session,
            question_text="Second Question",
            question_type=QuestionType.CHECKBOX
        )

        questions = await question.get_all_questions(db_session)

        assert len(questions) >= 2
        assert any(q.question_text == "First Question" for q in questions)
        assert any(q.question_text == "Second Question" for q in questions)

    @pytest.mark.asyncio
    async def test_update_question(self, db_session, test_question):
        """Тест обновления вопроса"""
        updated_question = await question.update_question(
            db_session,
            test_question.id_question,
            question_text="Updated Question Text",
            question_type=QuestionType.CHECKBOX
        )

        assert updated_question is not None
        assert updated_question.question_text == "Updated Question Text"
        assert updated_question.question_type == QuestionType.CHECKBOX

    @pytest.mark.asyncio
    async def test_delete_question(self, db_session, test_question):
        """Тест удаления вопроса"""
        result = await question.delete_question(db_session, test_question.id_question)
        deleted_question = await question.get_question(db_session, test_question.id_question)

        assert result is True
        assert deleted_question is None