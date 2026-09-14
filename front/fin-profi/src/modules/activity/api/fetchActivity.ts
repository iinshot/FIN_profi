import { publicApi } from '@/api'

import type { ActivityDTO } from '../constants'
import { activityAdapter } from '../helpers'

export async function fetchActivity(id: number) {
    try {
        const response = await publicApi.get<ActivityDTO[]>(`users/${id}/activity`)

        return response.data.map(obj => activityAdapter(obj)).reverse()
    } catch (error) {
        throw new Error("Не удалось загрузить недавнюю активность")
    }
}