import { Dispatch, SetStateAction, useContext, useRef } from 'react'

import { useToastStore } from '@/store'
import { QUIZ_STATUS } from '@/constants'

import { QuizContext } from '../components/QuizSection'
import { useAnswerMutation } from './useAnswerMutation'
import { useQuestionQuery } from './useQuestionQuery'
import { useStartQuizMutation } from './useStartQuizMutation'
import { queryClient } from '@/api'
import { FETCH_QUESTION_KEY } from '../constants'

export function useFormRef(
    passedCount: number,
    setPassedCount: Dispatch<SetStateAction<number>>
) {
    const formRef = useRef<HTMLFormElement>(null)
    const { id: quizId, setStatus } = useContext(QuizContext)

    const showToast = useToastStore(state => state.showToast)
    const { data } = useQuestionQuery(passedCount)
    const { mutateAsync: answerQuestion } = useAnswerMutation()
    const { mutateAsync: startQuiz } = useStartQuizMutation(quizId)

    const answerHandler = async () => {
        let ok = false

        if (formRef.current === null || data?.id === undefined) return ok

        const formData = new FormData(formRef.current)
        const answers = formData.getAll(`question-${data?.id}`)

        if (answers.length === 0) {
            showToast("Выберите вариант(-ы) ответа")
            return ok
        }

        setStatus(QUIZ_STATUS.LOADING)

        try {
            await Promise.all(answers
                .filter((answer): answer is string => typeof answer === "string")
                .map(answer => answerQuestion({ quizId, answerId: Number(answer) })))

            ok = true
        } catch (error) {
            if (error instanceof Error) {
                showToast(error.message)
            }
        } finally {
            setStatus(QUIZ_STATUS.STARTED)
            return ok
        }
    }

    const handleStartClick = async () => {
        setStatus(QUIZ_STATUS.STARTING)

        try {
            await startQuiz(quizId)

            setStatus(QUIZ_STATUS.STARTED)
        } catch (error) {
            if (error instanceof Error) {
                showToast(error.message)
            }

            setStatus(QUIZ_STATUS.WAITING)
        }
    }

    const handleNextClick = async () => {
        const ok = await answerHandler()

        if (!ok) return

        setPassedCount(prev => prev + 1)
    }

    const handleFinishClick = async () => {
        const ok = await answerHandler()

        if (!ok) return

        setStatus(QUIZ_STATUS.COMPLETED)

        queryClient.removeQueries({ queryKey: FETCH_QUESTION_KEY })
    }

    return {
        formRef,
        handlers: {
            handleStartClick,
            handleNextClick,
            handleFinishClick
        }
    }
}