import { useMutation } from '@tanstack/react-query'

import { setProgress } from '@/api'
import { useToastStore } from '@/store'

import { PROGRESS_MUTATION_KEY } from '../constants'

export function useProgressMutation() {
    const showToast = useToastStore(state => state.showToast)

    return useMutation({
        mutationFn: setProgress,
        mutationKey: PROGRESS_MUTATION_KEY,
        onError: (error) => showToast(error.message)
    })
}