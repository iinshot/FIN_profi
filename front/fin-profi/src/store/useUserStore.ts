import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AUTH } from '@/constants'
import type { Auth, Payload } from '@/constants'

import { parseToken } from './helpers'

type State = {
    auth: Auth,
    accessToken: string | null,
    id: number | null
}

type Action = {
    logout: () => void,
    setToken: (accessToken: string) => void
}

type UserStore = State & Action

export const useUserStore = create<UserStore>()(persist((set, _, store) => ({
    auth: AUTH.GUEST,
    accessToken: null,
    id: null,

    setToken: (accessToken) => {
        const { payload } = parseToken<Payload>(accessToken)

        set(() => ({
            auth: AUTH.AUTHORIZED,
            accessToken,
            id: parseInt(payload.id_user)
        }))
    },

    logout: () => set(() => store.getInitialState())
}), { name: "userStore" }))