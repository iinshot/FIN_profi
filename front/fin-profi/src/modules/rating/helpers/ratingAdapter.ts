import { Rating, RatingDTO } from '../constants'

export function ratingAdapter(rating: RatingDTO): Rating {
    return {
        count: rating.count,
        list: rating.list.map(ratingObj => ({
            id: ratingObj.id_user,
            name: ratingObj.name,
            points: ratingObj.points
        }))
    }
}