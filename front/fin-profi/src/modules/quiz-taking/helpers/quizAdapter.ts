import { Quiz, QuizDTO } from '@/constants'

export function quizAdapter(quiz: QuizDTO): Quiz {
    return {
        id: quiz.id_quiz,
        name: quiz.name,
        questions: quiz.quizes_questions.map(question => ({ id: question.id_question }))
    }
}