import { publicApi } from '@/api'
import { Article, ArticleDTO } from '@/constants'
import { articleAdapter } from '@/helpers'

export async function fetchArticles(): Promise<Article[]> {
    try {
        const response = await publicApi.get<ArticleDTO[]>(`/articles/`, {
            params: {
                skip: 0,
                limit: 100
            }
        })

        return response.data.map(resp => articleAdapter(resp))
    } catch (error) {
        throw error
    }
}