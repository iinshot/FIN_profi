import { useMutation } from '@tanstack/react-query'

import { ANSWER_MUTATION_KEY } from '../constants'
import { postAnswer } from '../api'

export function useAnswerMutation() {
    return useMutation({
        mutationKey: ANSWER_MUTATION_KEY,
        mutationFn: postAnswer
    })
}