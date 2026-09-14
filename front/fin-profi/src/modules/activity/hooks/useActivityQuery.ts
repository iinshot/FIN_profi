import { useQuery } from '@tanstack/react-query'

import { useParamsId } from '@/hooks'

import { FETCH_ACTIVITY_KEY } from '../constants'
import { fetchActivity } from '../api'

export function useActivityQuery() {
    const id = useParamsId("userId")

    return useQuery({
        queryKey: [...FETCH_ACTIVITY_KEY, id],
        queryFn: () => fetchActivity(id),
    })
}