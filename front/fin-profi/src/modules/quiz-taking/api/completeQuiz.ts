import { isAxiosError } from 'axios'

import { privateApi } from '@/api'

import { ResultDTO } from '../constants'
import { resultAdapter } from '../helpers'

export async function completeQuiz(id: number) {
    try {
        const response = await privateApi.post<ResultDTO>(`/quizzes/end_quiz/${id}`)

        const result = resultAdapter(response.data)

        return result
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.status === 404)
                throw new Error("Викторина не найдена")

            if (error.status === 400)
                throw new Error("Викторина не начата")
        }

        throw error
    }
}