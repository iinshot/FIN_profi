import { resize } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useHeightState(
    collapsed: boolean,
    count: number
) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [baseHeight, setBaseHeight] = useState(0)
    const [height, setHeight] = useState(0)

    const measureRef = useCallback((el: HTMLDivElement | null) => {
        if (!el) return
        return resize(el, (_, { height }) => setBaseHeight(height))
    }, [])

    useEffect(() => {
        const skipHeight = cardRef.current ? cardRef.current.offsetHeight + 20 : 190

        setHeight(
            collapsed ?
                baseHeight - (Math.trunc(count / 3.01) - 0.66) * skipHeight :
                baseHeight
        )
    }, [collapsed, cardRef.current, baseHeight])

    return { measureRef, cardRef, height }
}