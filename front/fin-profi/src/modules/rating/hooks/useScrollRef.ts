import { useEffect, useRef } from "react"

export function useScrollRef(isLoading: boolean, ownerId: number) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<number>(null)

    useEffect(() => {
        const container = scrollRef.current

        const element = container?.querySelector(`[data-id="${ownerId}"]`) as HTMLElement

        if (timeoutRef.current)
            clearTimeout(timeoutRef.current)

        if (isLoading || !element || !container) return

        timeoutRef.current = setTimeout(() => {
            container.scrollTo({
                top: element.offsetTop - container.clientHeight / 2,
                behavior: "smooth"
            })
        }, 200)

    }, [isLoading, ownerId])

    return { containerRef: scrollRef }
}