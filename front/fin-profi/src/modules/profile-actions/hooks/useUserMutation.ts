import { useMutation } from '@tanstack/react-query'

import { queryClient, updateUser } from '@/api'
import { useToastStore } from '@/store'
import { FETCH_RATING_KEY, Rating } from '@/modules/rating'
import { FETCH_USER_KEY, User, UserParams } from '@/constants'

export function useUserMutation() {
    const showToast = useToastStore(state => state.showToast)

    return useMutation({
        mutationFn: updateUser,

        onMutate: async ({ id, params: user }) => {
            await queryClient.cancelQueries({ queryKey: [...FETCH_USER_KEY, id] })

            const previousUserData = queryClient.getQueryData<User>([...FETCH_USER_KEY, id])

            queryClient.setQueryData<User | UserParams>(
                [...FETCH_USER_KEY, id],
                (prevUser) => ({ ...prevUser, ...user })
            )

            const previousRatingData = queryClient.getQueryData<Rating>([...FETCH_RATING_KEY, id])

            queryClient.setQueryData<Rating>(
                [...FETCH_RATING_KEY, id],
                (prevRating) => ({
                    ...prevRating,
                    list: prevRating?.list.map(u => {
                        if (u.id === id) {
                            return {
                                ...u,
                                name: user.name,
                                email: user.email
                            }
                        }

                        return u
                    })
                } as Rating)
            )

            return { previousUserData, previousRatingData }
        },

        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [...FETCH_USER_KEY, id] })
            queryClient.invalidateQueries({ queryKey: [...FETCH_RATING_KEY, id] })
        },

        onError: (_, { id }, context) => {
            queryClient.setQueryData([...FETCH_USER_KEY, id], context?.previousUserData)
            queryClient.setQueryData([...FETCH_RATING_KEY, id], context?.previousRatingData)

            showToast("Не удалось обновить профиль")
        }
    })
}