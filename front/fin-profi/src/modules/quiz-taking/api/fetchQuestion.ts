import { isAxiosError } from 'axios'

import { privateApi } from '@/api'

import { QuestionDTO } from '../constants'
import { questionAdapter } from '../helpers'

export async function fetchQuestion(id: number) {
    try {
        const response = await privateApi.get<QuestionDTO>(`/quizzes/get_next_question/${id}`)

        return questionAdapter(response.data)
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.status === 400)
                throw new Error("Викторина не была начата")

            if (error.status === 404)
                throw new Error("Викторина не найдена")
        }

        throw new Error("Не удалось начать викторину")
    }
}