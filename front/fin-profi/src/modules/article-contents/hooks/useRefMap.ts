import { useCallback, useRef } from 'react'

export function useRefMap() {
    const refMap = useRef<Map<number, HTMLDivElement>>(new Map())

    const refCallback = useCallback((order?: number) => {
        if (!order) return undefined

        return (node: HTMLDivElement | null) => {
            if (node)
                refMap.current.set(order, node)
            else
                refMap.current.delete(order)

        }
    }, [])

    return { refMap, refCallback }
}