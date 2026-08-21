import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'

import { useToastStore } from '@/store'

export function useAnimateClose(index: number, id: number) {
    const removeToast = useToastStore(state => state.removeToast)
    const [scope, animate] = useAnimate()

    useEffect(() => {
        if (index !== 0) return

        const controls = animate(
            scope.current,
            { background: `linear-gradient(90deg, var(--text) 0%, rgb(69, 69, 40) 0%)` },
            { duration: 5 }
        )

        controls.then(() => removeToast(id))

        return () => controls.stop()
    }, [index, id])

    return scope
}