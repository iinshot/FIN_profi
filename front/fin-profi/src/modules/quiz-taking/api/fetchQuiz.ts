import { isAxiosError } from 'axios'

import { publicApi } from '@/api'

import { QuizDTO } from '../constants'

export async function fetchQuiz(id: number) {
    try {
        const response = await publicApi.get<QuizDTO>(`/quizzes/${id}`)

        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.status === 404)
                throw new Error("Викторина не найдена")
        }

        throw new Error("Не удалось загрузить квиз")
    }
}