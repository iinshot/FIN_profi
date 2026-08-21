import { RefObject, useEffect, useState } from 'react'

import { QUIZ_STATUS, QuizStatus } from '@/constants'

export function useQuizStatusState(ref: RefObject<HTMLDivElement | null>) {
    const [quizStatus, setQuizStatus] = useState<QuizStatus>(QUIZ_STATUS.WAITING)

    useEffect(() => {
        const element = ref.current

        if (quizStatus === QUIZ_STATUS.WAITING || quizStatus === QUIZ_STATUS.STARTING || !element) return

        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 300)
    }, [quizStatus])

    return [quizStatus, setQuizStatus] as const
}