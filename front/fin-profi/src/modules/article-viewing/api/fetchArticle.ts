import { publicApi } from '@/api'
import { ArticleDTO } from '@/constants'

import { articleAdapter } from '../helpers'
import { isAxiosError } from 'axios'

export async function fetchArticle(id: number) {
    try {
        const response = await publicApi.get<ArticleDTO>(`/articles/${id}`)

        return articleAdapter(response.data)
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.status === 404) {
                error.message = "Не существующая статья"
                throw error
            }

            if (error.status === 422)
                throw error
        }

        throw new Error("Не удалось загрузить статью")
    }
}