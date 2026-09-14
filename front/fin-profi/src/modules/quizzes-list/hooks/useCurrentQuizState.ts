import { useEffect, useState } from 'react'

import { queryClient } from '@/api'
import { COMPLETE_QUIZ_KEY, START_QUIZ_MUTATION_KEY } from '@/modules/quiz-taking'
import { FETCH_QUIZZES_KEY } from '@/constants'

import { CurrentQuiz } from '../constants'

export function useCurrentQuizState() {
    const [currentQuiz, setCurrentQuiz] = useState<CurrentQuiz>({
        status: 'selected',
        id: 1
    })

    useEffect(() => {
        const unsubscribe = queryClient.getMutationCache().subscribe((event) => {
            const mutation = event.mutation
            const mutationKey = mutation?.options?.mutationKey

            if (!mutation || !mutationKey) return

            const [key, id] = mutationKey

            if (key !== START_QUIZ_MUTATION_KEY[0] || id !== currentQuiz.id) return

            if (mutation.state.status === "success" && currentQuiz.status !== "started") {
                setCurrentQuiz(prev => ({
                    ...prev,
                    status: 'started'
                }))
            }
        })

        document.querySelector('.content-container')?.scrollTo({ behavior: "smooth", top: 0 })

        return unsubscribe
    }, [currentQuiz])

    useEffect(() => {
        const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
            const query = event.query
            const [key, id] = query.queryKey

            if (key !== COMPLETE_QUIZ_KEY[0] || id !== currentQuiz.id) return

            if (query.state.status === "success" && currentQuiz.status !== "completed") {
                setTimeout(() => {
                    setCurrentQuiz(prev => ({
                        ...prev,
                        status: 'completed'
                    }))
                    queryClient.invalidateQueries({ queryKey: [...FETCH_QUIZZES_KEY] })
                }, 0)
            }
        })

        return unsubscribe
    }, [currentQuiz])

    return [currentQuiz, setCurrentQuiz] as const
}