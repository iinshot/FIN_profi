import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import { QUIZ_STATUS } from '@/constants'

import { COMPLETE_QUIZ_KEY } from '../constants'
import { QuizContext } from '../components/QuizSection'
import { completeQuiz } from '../api'

export function useCompleteQuizQuery(paramId?: number) {
    const { id: contextId, status } = useContext(QuizContext)
    const id = paramId ?? contextId

    return useQuery({
        queryKey: [...COMPLETE_QUIZ_KEY, id],
        queryFn: () => completeQuiz(id),
        enabled: status === QUIZ_STATUS.COMPLETED,
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })
}