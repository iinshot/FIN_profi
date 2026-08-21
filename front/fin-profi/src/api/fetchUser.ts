import { isAxiosError } from 'axios'

import { publicApi } from '@/api'
import { UserDTO, User } from '@/constants'
import { userAdapter } from '@/helpers'

export async function fetchUser(id: number): Promise<User> {
    try {
        const response = await publicApi.get<UserDTO>(`/users/${id}`)

        return userAdapter(response.data)
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.status === 404)
                error.message = "Пользователь не найден"

            throw error
        }
        throw new Error("Не удалось загрузить данные пользователя")
    }
}