import { useQueries } from '@tanstack/react-query'

import { useProgressStore } from '@/store'
import { FETCH_ARTICLES_KEY, STATUS } from '@/constants'
import { fetchArticles } from '@/api'

import { FETCH_ARTICLES_PROGRESS_KEY, FETCH_MODULES_KEY } from '../constants'
import { fetchModules, fetchArticlesProgress } from '../api'
import { getPlaceholder, moduleAdapter } from '../helpers'

export function useModulesQueries() {
    const status = useProgressStore(state => state.status)
    const articles = useProgressStore(state => state.articles)

    return useQueries({
        queries: [
            {
                queryKey: FETCH_MODULES_KEY,
                queryFn: fetchModules
            },
            {
                queryKey: FETCH_ARTICLES_KEY,
                queryFn: fetchArticles
            },
            {
                queryKey: [...FETCH_ARTICLES_PROGRESS_KEY, status],
                queryFn: fetchArticlesProgress,
                enabled: status === STATUS.CLOSED
            }
        ],
        combine: (results) => {
            const [modulesRes, articlesRes, progressRes] = results
            const isError = results.some(res => res.isError)

            if (!modulesRes.data || !articlesRes.data || (status === STATUS.CLOSED && !progressRes.data)) {
                return {
                    data: getPlaceholder(),
                    isLoading: results.some(res => res.isLoading),
                    isError,
                    error: isError ? new Error("Не удалось загрузить модули") : null
                }
            }

            const progressData = status === STATUS.CLOSED ? progressRes.data : articles
            const progressMap = new Map(
                progressData?.map(p => [p.articleId, {
                    progress: p.progress,
                    isRead: p.isRead
                }])
            )

            const data = modulesRes.data.map(module => {
                let articlesData = articlesRes.data
                    .filter(article => module.id === article.moduleId)
                    .map(article => {
                        const progressObj = progressMap.get(article.id) ?? {
                            progress: 0,
                            isRead: false
                        }

                        return {
                            ...article,
                            progress: progressObj.progress,
                            isRead: progressObj.isRead
                        }
                    })

                return moduleAdapter(module, articlesData)
            })

            return {
                data,
                isLoading: results.some(res => res.isLoading),
                isError,
                error: isError ? new Error("Не удалось загрузить модули") : null
            }
        }
    })
}