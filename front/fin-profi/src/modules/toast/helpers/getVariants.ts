import { Variants } from 'framer-motion'

import { GAP, HEIGHT } from '../constants'

export function getVariants(count: number): Variants {
    return {
        initial: {
            opacity: 0,
            y: -100,
            background: `linear-gradient(90deg, var(--text) 100%, rgb(69, 69, 40) 100%)`
        },

        collapse: (index) => ({
            zIndex: count - index,
            scale: 1 - 0.05 * Math.min(1, index),
            opacity: 1 - 0.1 ** (1 / (count - 1)) * Math.min(1, index),
            y: 0 - 8 * Math.min(1, index),
        }),

        expand: (index) => ({
            zIndex: count - index,
            scale: 1,
            opacity: 0.95,
            y: (HEIGHT + GAP) * index,
            transition: {
                delay: 0.05 * index
            },
        }),

        hover: (index) => (
            index === 0 ? { y: 5 } : {}
        )
    }
}