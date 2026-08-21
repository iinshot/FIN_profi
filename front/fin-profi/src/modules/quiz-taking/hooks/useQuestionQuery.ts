import { useContext } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { QUIZ_STATUS } from '@/constants'

import { fetchQuestion } from '../api'
import { FETCH_QUESTION_KEY } from '../constants'
import { QuizContext } from '../components/QuizSection'

export function useQuestionQuery(number: number) {
    const { id, status } = useContext(QuizContext)

    return useQuery({
        queryKey: [...FETCH_QUESTION_KEY, number],
        queryFn: () => fetchQuestion(id),
        placeholderData: keepPreviousData,
        enabled: status === QUIZ_STATUS.STARTED,
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })
}