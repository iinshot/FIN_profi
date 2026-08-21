import { useQuery } from '@tanstack/react-query'

import { useParamsId } from '@/hooks'

import { fetchStatistics } from '../api'
import { FETCH_STATISTICS_KEY, type Statistics } from '../constants'

export function useStatisticsQuery() {
    const id = useParamsId("userId")

    return useQuery<Statistics>({
        queryKey: [...FETCH_STATISTICS_KEY, id],
        queryFn: () => fetchStatistics(id)
    })
}