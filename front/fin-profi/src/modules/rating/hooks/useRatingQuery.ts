import { useQuery } from '@tanstack/react-query'

import { FETCH_RATING_KEY, Rating } from '../constants'
import { fetchRating } from '../api'

export function useRatingQuery(id: number) {
    return useQuery<Rating>({
        queryKey: [...FETCH_RATING_KEY, id],
        queryFn: () => fetchRating(id)
    })
}