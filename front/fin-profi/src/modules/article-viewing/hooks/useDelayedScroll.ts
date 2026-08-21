import { RefObject, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export function useDelayedScroll(
    isSuccess: boolean,
    refMap: RefObject<Map<number, HTMLDivElement | undefined>>,
    header: number
) {
    const { hash } = useLocation()
    const hasScrolled = useRef(false)

    useEffect(() => {
        if (!isSuccess || hasScrolled.current) return

        const timer = setTimeout(() => {
            const node = hash === "" ? refMap.current.get(header) : document.querySelector(hash)

            node?.scrollIntoView({ behavior: "smooth" })

            hasScrolled.current = true
        }, 300)

        return () => clearTimeout(timer)
    }, [isSuccess, hash, refMap, header])
}