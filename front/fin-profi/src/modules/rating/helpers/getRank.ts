import { RatingDetail } from "../constants"

export function getRank(id: number, rating: RatingDetail[]) {
    return rating.findIndex(user => user.id === id) + 1
}