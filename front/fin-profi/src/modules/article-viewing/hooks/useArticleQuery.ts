import { useQuery } from '@tanstack/react-query'

import { Article, Block, FETCH_ARTICLE_KEY } from '../constants'
import { fetchArticle } from '../api'

export function useArticleQuery(id: number) {
    return useQuery({
        queryKey: [...FETCH_ARTICLE_KEY, id],
        queryFn: () => fetchArticle(id),
        select: (data) => {
            const { content } = data
            let count = 0

            const modifiedContent = content.map(block => {
                if (block.type === "header")
                    block.order = ++count

                return block
            })

            return {
                ...data,
                content: modifiedContent
            } as Article
        }
    })
}