import { Variants } from 'framer-motion'

import { COLORS } from '@/constants'

export function getGradientVariants(isRead: boolean, progress: number, order: 1 | 2): Variants {
    return {
        initial: (id: number) => ({
            offset: id % 2 === 0 ? "0%" : "100%",
            stopColor: (order - 1 === id % 2) ? COLORS.PRIMARY_YELLOW : COLORS.SURFACE_LIGHT
        }),

        animate: (id: number) => ({
            offset: id % 2 === 0 ? `${isRead ? 100 : progress}%` : `${100 - (isRead ? 100 : progress)}%`
        })
    }
}