import { UserDTO } from '@/constants'

type RatingDetail = Pick<UserDTO, 'id' | 'name' | 'points'>

type RatingDetailDTO = Omit<RatingDetail, 'id'> & { id_user: RatingDetail['id'] }

type RatingDTO = {
    count: number,
    list: RatingDetailDTO[]
}

type Rating = {
    count: number,
    list: RatingDetail[]
}

type Highlight = 'leader' | 'you' | 'current-user'

export type { RatingDetail, RatingDTO, Rating, Highlight }