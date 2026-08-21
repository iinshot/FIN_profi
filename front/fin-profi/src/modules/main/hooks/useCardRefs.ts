import { useRef } from 'react'

export function useCardRefs() {
    const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map())

    const setCardRefs = (id: number) => {
        return (node: HTMLDivElement | null) => {
            if (node)
                cardRefs.current.set(id, node)
            else
                cardRefs.current.delete(id)
        }
    }

    return { cardRefs, setCardRefs }
}