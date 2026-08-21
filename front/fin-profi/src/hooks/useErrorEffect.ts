import { useEffect } from 'react'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router'

import { useToastStore } from '@/store'
import { queryClient } from '@/api'

export function useErrorEffect(error: Error | null) {
    const showToast = useToastStore(state => state.showToast)
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            if (isAxiosError(error)) {
                queryClient.cancelQueries()

                if (error.status === 404) {
                    showToast(error.message)
                    navigate("/not-found")
                }

                if (error.status === 422) {
                    showToast("Неверный формат строки поиска")
                    navigate("/not-found")
                }
            } else
                showToast(error.message)
        }
    }, [error])
}