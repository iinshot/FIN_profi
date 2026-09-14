import { privateApi } from '@/api'
import { Progress, ProgressDTO } from '@/constants'
import { progressAdapter } from '@/helpers'

export async function fetchArticlesProgress(): Promise<Progress[]> {
    try {
        const response = await privateApi.get<ProgressDTO[]>(`users/get_total_progress/`)

        return response.data.map(resp => progressAdapter(resp))
    } catch (error) {
        throw error
    }
}