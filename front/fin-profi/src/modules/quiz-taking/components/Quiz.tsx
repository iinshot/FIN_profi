import { useContext, useState } from 'react'
import clsx from 'clsx'

import { Button } from '@/ui'
import { ArrowRight, Check, Play } from '@/assets/icons'
import { AUTH, QUIZ_STATUS } from '@/constants'
import { useUserStore } from '@/store'

import { QuizHeader } from './QuizHeader'
import { QuizProgress } from './QuizProgress'
import { QuizBody } from './QuizBody'
import { QuizContext } from './QuizSection'
import { useCompleteQuizQuery, useFormRef, useQuestionQuery, useQuizQuery } from '../hooks'

type QuizProps = {
  name?: string
}

export function Quiz({ name }: QuizProps) {
  const { status } = useContext(QuizContext)
  const [passedCount, setPassedCount] = useState(0)

  const auth = useUserStore(state => state.auth)
  const quizResponse = useQuizQuery()
  const questionResponse = useQuestionQuery(passedCount)
  const resultResponse = useCompleteQuizQuery()
  const { formRef, handlers } = useFormRef(passedCount, setPassedCount)

  const questionsCount = quizResponse.data?.questions.length
  const isLast = questionsCount === passedCount + 1
  const disabledStart = auth === AUTH.GUEST || questionResponse.isFetching || status === QUIZ_STATUS.STARTING
  const disabledComplete = questionResponse.isFetching || resultResponse.isFetching || status === QUIZ_STATUS.LOADING
  const disabledNext = questionResponse.isFetching || status === QUIZ_STATUS.LOADING

  return (
    <>
      <QuizHeader
        isLoading={quizResponse.isPending || quizResponse.isError}
        count={questionsCount}
        name={name}
      >
        {questionResponse.isPending && <Button
          text="Начать викторину"
          className={clsx({ disabled: disabledStart })}
          right={<Play width={9} height={9} />}
          onClick={handlers.handleStartClick}
          primary
        />}
      </QuizHeader>

      {questionResponse.isSuccess &&
        <>
          <QuizProgress
            progress={passedCount + 1}
            count={questionsCount}
          />

          <QuizBody
            currQuestionNumber={passedCount + 1}
            ref={formRef}
          />

          {isLast ?
            <Button
              text="Завершить"
              className={clsx({ disabled: disabledComplete })}
              right={<Check width={9} height={9} />}
              onClick={handlers.handleFinishClick}
              primary
            /> :
            <Button
              text="Дальше"
              className={clsx({ disabled: disabledNext })}
              right={<ArrowRight width={9} height={9} />}
              onClick={handlers.handleNextClick}
              primary
            />
          }
        </>
      }
    </>
  )
}
