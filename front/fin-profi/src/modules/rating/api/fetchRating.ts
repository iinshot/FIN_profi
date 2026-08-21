import { publicApi } from '@/api'

import { Rating, RatingDTO } from '../constants'
import { ratingAdapter } from '../helpers'

export async function fetchRating(id: number): Promise<Rating> {
    try {
        const response = await publicApi.get<RatingDTO>(`/users/${id}/rating`)

        return ratingAdapter(response.data)
    } catch (error) {
        throw new Error("Не удалось загрузить рейтинг")
    }
}