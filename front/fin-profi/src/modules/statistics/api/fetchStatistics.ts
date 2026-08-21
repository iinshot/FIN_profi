import { publicApi } from '@/api'

import { Statistics, StatisticsDTO } from '../constants'
import { statisticsAdapter } from '../helpers'

export async function fetchStatistics(id: number): Promise<Statistics> {
    try {
        const response = await publicApi.get<StatisticsDTO>(`/users/${id}/statistics`)

        return statisticsAdapter(response.data)
    } catch (error) {
        throw new Error("Не удалось загрузить статистику")
    }
}