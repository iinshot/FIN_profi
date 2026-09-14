import { useQuery } from '@tanstack/react-query'

import { FETCH_QUIZ_KEY } from '../constants'
import { fetchQuiz } from '../api'
import { useContext } from 'react'
import { QuizContext } from '../components/QuizSection'
import { useUserStore } from '@/store'
import { quizAdapter } from '../helpers'

export function useQuizQuery() {
    const { id } = useContext(QuizContext)
    const userId = useUserStore(state => state.id)

    return useQuery({
        queryKey: [...FETCH_QUIZ_KEY, id],
        queryFn: () => fetchQuiz(id),
        select: (quiz) => {
            let isCompleted: boolean = false

            quiz.users_quizes.forEach(user => {
                if (user.id_user === userId)
                    isCompleted = user.is_completed
            })

            const adaptedQuiz = quizAdapter(quiz)
            adaptedQuiz.isCompleted = isCompleted

            return adaptedQuiz
        }
    })
}