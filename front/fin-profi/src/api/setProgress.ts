import { isAxiosError } from 'axios'
import { privateApi } from './private'
import { ProgressParams } from '@/constants'

export async function setProgress({ id, params }: {
    id: number,
    params: ProgressParams
}) {
    try {
        await privateApi.post(`/users/set_progress/${id}`, {}, { params })
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.status === 404)
                throw new Error("Не удалось найти статью для сохранения")
        }

        throw new Error("Не удалось сохранить прогресс")
    }
}