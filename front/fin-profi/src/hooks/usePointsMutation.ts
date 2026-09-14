import { useMutation } from '@tanstack/react-query'

import { updateUser } from '@/api'
import { useToastStore } from '@/store'
import { POINTS_MUTATION_KEY } from '@/constants'

export function usePointsMutation() {
    const showToast = useToastStore(state => state.showToast)

    return useMutation({
        mutationKey: POINTS_MUTATION_KEY,
        mutationFn: updateUser,
        onError: (error) => showToast(error.message)
    })
}