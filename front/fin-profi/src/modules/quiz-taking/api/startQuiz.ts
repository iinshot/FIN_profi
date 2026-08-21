import { isAxiosError } from 'axios'

import { privateApi } from '@/api'

import { QuizResponseDTO } from '../constants'

export async function startQuiz(id: number) {
    try {
        await privateApi.post<QuizResponseDTO>(`/quizzes/start_quiz/${id}`)

        return true
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.status === 404)
                throw new Error("Викторина не найдена")
        }

        throw new Error("Не удалось загрузить квиз")
    }
}