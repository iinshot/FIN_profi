import { useQueries } from '@tanstack/react-query'

import { FETCH_ARTICLES_KEY, FETCH_QUIZZES_KEY, Quiz } from '@/constants'
import { useUserStore } from '@/store'
import { fetchArticles } from '@/api'

import { fetchQuizzes } from '../api'

export function useQuizzesQuery() {
    const id = useUserStore(state => state.id)

    return useQueries({
        queries: [
            {
                queryKey: [...FETCH_QUIZZES_KEY],
                queryFn: () => fetchQuizzes(id)
            },
            {
                queryKey: [...FETCH_ARTICLES_KEY],
                queryFn: fetchArticles
            }
        ],

        combine: (result) => {
            const [quizzesRes, articlesRes] = result

            if (quizzesRes.isError || quizzesRes.isPending)
                return {
                    ...quizzesRes,
                    data: [] as (Quiz & { moduleId: number | null })[]
                }

            if (articlesRes.isError || articlesRes.isPending)
                return {
                    ...articlesRes,
                    data: [] as (Quiz & { moduleId: number | null })[]
                }

            const quizMap = new Map<number, number>(articlesRes.data
                .filter(article => article.quizId !== null)
                .map(article => ([article.quizId!, article.moduleId]))
            )

            return {
                ...articlesRes,
                data: quizzesRes.data.map(quiz => ({
                    ...quiz,
                    moduleId: quizMap.get(quiz.id) ?? null
                }))
            }
        }
    })
}