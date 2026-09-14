import { useEffect } from 'react'

export function useEnterKeyEffect(
    isEditing: boolean,
    action: () => void
) {
    useEffect(() => {
        if (isEditing == false) return

        const handleEnterKey = async (event: KeyboardEvent) => {
            if (event.key === 'Enter') action()
        }

        window.addEventListener('keydown', handleEnterKey)

        return () => window.removeEventListener('keydown', handleEnterKey)
    }, [isEditing, action])
}