import { publicApi } from '@/api'
import { QuizDTO } from '@/constants'

import { quizAdapter } from '../helpers'

export async function fetchQuizzes(id: number | null) {
    try {
        const response = await publicApi.get<QuizDTO[]>(`/quizzes/`, {
            params: {
                skip: 0,
                limit: 100
            }
        })

        return response.data.map(quiz => quizAdapter(quiz, id))
    } catch (error) {
        throw new Error("Не удалось загрузить викторины")
    }
}