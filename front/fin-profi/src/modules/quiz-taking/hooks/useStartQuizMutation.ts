import { useMutation } from '@tanstack/react-query'

import { START_QUIZ_MUTATION_KEY } from '../constants'
import { startQuiz } from '../api'

export function useStartQuizMutation(id: number) {
    return useMutation({
        mutationKey: [...START_QUIZ_MUTATION_KEY, id],
        mutationFn: startQuiz
    })
}