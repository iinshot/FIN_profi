import { Check } from '@/assets/icons'

import { QuestionType, QUESTION_TYPE } from '@/constants'

type OptionProps = {
  type: QuestionType,
  text: string,
  questionId: number,
  id: number,
  disabled: boolean
}

export function Option({ type, text, questionId, id, disabled }: OptionProps) {
  return (
    <label className="option">
      <input
        type={type}
        name={`question-${questionId}`}
        value={id}
        disabled={disabled}
      />

      <div className={type}>
        {type === QUESTION_TYPE.CHECKBOX ?
          <Check width={12} height={12} /> :
          <div className="circle"></div>}
      </div>

      <span className="body">{text}</span>
    </label>
  )
}
