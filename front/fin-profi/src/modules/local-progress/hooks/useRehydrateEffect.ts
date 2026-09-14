import { useEffect } from 'react'

import { useProgressStore, useToastStore, useUserStore } from '@/store'
import { AUTH, STATUS } from '@/constants'

import { trigger } from '../helpers'

export function useRehydrateEffect() {
    const hasHydrated = useProgressStore(state => state.hasHydrated)
    const progress = useProgressStore(state => state.progress)
    const setStatus = useProgressStore(state => state.setStatus)
    const showToast = useToastStore(state => state.showToast)
    const auth = useUserStore(state => state.auth)

    useEffect(() => {
        if (!hasHydrated || auth === AUTH.GUEST) return

        if (0 < progress && progress < 100) {
            (async () => {
                const { error } = await trigger()

                if (error !== null)
                    showToast("Не удалось синхронизировать")
            })()
        }

        if (progress === 0)
            setStatus(STATUS.CLOSED)
    }, [hasHydrated, auth])
}