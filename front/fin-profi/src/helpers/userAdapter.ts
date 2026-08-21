import { User, UserDTO } from '@/constants'

export function userAdapter(user: UserDTO): User {
    return {
        id: user.id_user,
        name: user.name,
        email: user.email,
        points: user.points
    }
}