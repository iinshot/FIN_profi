import { publicApi } from '@/api'

import { Module, ModuleDTO } from '../constants'
import { moduleAdapter } from '../helpers'

export async function fetchModules(): Promise<Module[]> {
    try {
        const response = await publicApi.get<ModuleDTO[]>(`/modules/`, {
            params: {
                skip: 0,
                limit: 100
            }
        })

        return response.data.map(resp => moduleAdapter(resp))
    } catch (error) {
        throw error
    }
}