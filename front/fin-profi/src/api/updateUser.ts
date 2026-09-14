import { isAxiosError } from 'axios'

import { publicApi } from '@/api'
import { UserParams } from '@/constants'

export async function updateUser({ id, params }: {
    id: number,
    params: UserParams
}) {
    try {
        await publicApi.put(`/users/${id}`, {}, { params })
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.status === 404) {
                throw new Error("Пользователь не найден")
            }

            if (error.status === 400) {
                throw new Error("Не указаны данные для обновления")
            }
        }

        throw error
    }
}