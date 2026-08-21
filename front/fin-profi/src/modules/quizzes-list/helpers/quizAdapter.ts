import { Quiz, QuizDTO } from '@/constants'

export function quizAdapter(quiz: QuizDTO, id: number | null): Quiz {
    return {
        id: quiz.id_quiz,
        name: quiz.name,
        questions: quiz.quizes_questions.map(question => ({ id: question.id_question })),
        isCompleted: quiz.users_quizes.some(uq => uq.id_user === id && uq.is_completed)
    }
}