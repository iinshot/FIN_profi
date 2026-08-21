import { useToastStore } from '@/store'

export function showConfirmToast(message: string): Promise<boolean> {
    const open = useToastStore.getInitialState().open

    return new Promise(resolve => open(message, resolve))
}