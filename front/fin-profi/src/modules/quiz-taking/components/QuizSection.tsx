import { createContext, Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { motion, resize } from 'framer-motion'

import { Section } from '@/ui'
import { useUserStore } from '@/store'
import { QuizStatus, AUTH, QUIZ_STATUS } from '@/constants'
import { useErrorEffect } from '@/hooks'

import { Quiz } from './Quiz'
import { Results } from './Results'
import { Warning } from './Warning'
import { useCompleteQuizQuery, useQuizStatusState } from '../hooks'
import '../style.scss'

type QuizSectionProps = {
  id: number,
  name?: string
}

interface QuizContextType {
  status: QuizStatus,
  setStatus: Dispatch<SetStateAction<QuizStatus>>,
  id: number
}

export const QuizContext = createContext<QuizContextType>({} as QuizContextType)

export function QuizSection({ id, name }: QuizSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const auth = useUserStore(state => state.auth)

  const measureRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return
    return resize(el, (_, { height }) => setHeight(height))
  }, [])

  const [quizStatus, setQuizStatus] = useQuizStatusState(scrollRef)
  const { isPending: shouldShow, error } = useCompleteQuizQuery(id)

  useErrorEffect(error)

  return (
    <Section
      className="quiz-taking-wrapper"
      padding="32px 120px"
      animate={{ height }}
      ref={scrollRef}
    >
      <motion.div
        className="quiz-taking"
        ref={measureRef}
      >
        <QuizContext value={{ status: quizStatus, setStatus: setQuizStatus, id }}>
          {shouldShow ? <Quiz name={name} /> : <Results />}
          {auth === AUTH.GUEST && <Warning />}
        </QuizContext>
      </motion.div>
    </Section>
  )
}