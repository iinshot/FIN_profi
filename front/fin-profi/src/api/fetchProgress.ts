import { ProgressDTO } from '@/constants'
import { privateApi } from './private'
import { progressAdapter } from '@/helpers'

export async function fetchProgress(id: number) {
    try {
        const response = await privateApi.get<ProgressDTO>(`users/get_progress/${id}`)

        return progressAdapter(response.data)
    } catch (error) {
        throw new Error('Не удалось получить прогресс')
    }
}