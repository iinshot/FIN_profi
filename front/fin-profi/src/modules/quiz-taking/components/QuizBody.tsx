import { RefObject, useContext } from 'react'

import { QUESTION_TYPE, QUIZ_STATUS } from '@/constants'

import { Option } from './Option'
import { QuizContext } from './QuizSection'
import { placeholder } from '../constants'
import { useQuestionQuery } from '../hooks'

type QuizBodyProps = {
  currQuestionNumber: number,
  ref: RefObject<HTMLFormElement | null>
}

export function QuizBody({ currQuestionNumber, ref }: QuizBodyProps) {
  const { status } = useContext(QuizContext)
  const { data, isFetching } = useQuestionQuery(currQuestionNumber - 1)

  const type = data!.type
  const answers = data!.answers
  const questionId = data!.id

  return (
    <div className="quiz-taking-body">
      <div className="quiz-taking-body-header">
        <span className="h3 number">{currQuestionNumber}</span>

        <span className="h3">{placeholder.text}</span>

        {type === QUESTION_TYPE.CHECKBOX &&
          <span className="small">(выберите все верные)</span>
        }
      </div>

      <form ref={ref}>
        {answers.map(answer => (
          <Option
            key={answer.id}
            type={type}
            questionId={questionId}
            text={answer.text}
            id={answer.id}
            disabled={isFetching || status === QUIZ_STATUS.LOADING}
          />
        ))}
      </form>
    </div>
  )
}