import { useModulesQueries } from './useModulesQueries'

export function useHasNextArticle(id: number) {
    const { data } = useModulesQueries()

    const articles = data
        .map(module => module.articles)
        .reduce((a, b) => a.concat(b), [])

    return articles.find(article => article.id === id + 1) !== undefined
}