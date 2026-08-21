import { privateApi } from '@/api'
import { isAxiosError } from 'axios'

export async function postAnswer({ quizId, answerId }: {
    quizId: number,
    answerId: number
}) {
    try {
        await privateApi.post(`/quizzes/answer_question/${quizId}/${answerId}`)
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.status === 404)
                throw new Error("Квиз или ответ не найден")

            if (error.status === 400)
                throw new Error("Не удалось ответить на вопрос")
        }

        throw error
    }
}