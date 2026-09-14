import { BASE_URL } from '@/constants'
import { delay } from '@/helpers'
import axios from 'axios'

export const publicApi = axios.create({
    headers: {
        Accept: "application/json"
    },
    baseURL: BASE_URL,
})

publicApi.interceptors.request.use(async config => {
    await delay(200 + Math.random() * 800)

    return config
})