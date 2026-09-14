import { create } from 'zustand'

import { ConfirmToast, Toast } from '@/constants'

type State = {
    toasts: Toast[],
    confirmToast: ConfirmToast
}

type Action = {
    showToast: (
        message: string,
        action?: () => void
    ) => void,
    removeToast: (id: number) => void,
    open: (
        message: string,
        resolver: (value: boolean) => void
    ) => void,
    confirm: () => void,
    cancel: () => void
}

type ToastStore = State & Action

export const useToastStore = create<ToastStore>()((set, get, store) => ({
    toasts: [],

    confirmToast: {
        message: null,
        isOpen: false,
        resolver: null
    },

    showToast: (message, action) => {
        const id = (get().toasts.at(-1) ?? { id: 0 }).id + 1

        const a = () => {
            if (action) action()

            get().removeToast(id)
        }

        set(state => ({
            toasts: [
                ...state.toasts,
                { message, id, action: a }
            ]
        }))
    },

    removeToast: (id) => set(state => {
        const toasts = state.toasts.filter(s => s.id !== id)

        return { toasts }
    }),

    open: (message, resolver) => {
        set(state => ({
            ...state,
            confirmToast: {
                isOpen: true,
                message,
                resolver
            }
        }))
    },

    confirm: () => {
        const resolver = get().confirmToast.resolver

        if (resolver !== null) resolver(true)

        set(state => ({
            ...state,
            confirmToast: store.getInitialState().confirmToast
        }))
    },

    cancel: () => {
        const resolver = get().confirmToast.resolver

        if (resolver !== null) resolver(false)

        set(state => ({
            ...state,
            confirmToast: store.getInitialState().confirmToast
        }))
    }
}))