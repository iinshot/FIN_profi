import { Dispatch, SetStateAction, useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Section } from '@/ui'
import { ArrowVertical } from '@/assets/icons'
import { queryClient } from '@/api'
import { COMPLETE_QUIZ_KEY } from '@/modules/quiz-taking'

import { QuizCard } from './QuizCard'
import { QuizCardGroup } from './QuizCardGroup'
import { useHeightState, useQuizzesQuery } from '../hooks'
import { CurrentQuiz } from '../constants'
import "../style.scss"

type GeneralQuizzesSectionProps = {
  currentQuiz: CurrentQuiz,
  setCurrentQuiz: Dispatch<SetStateAction<CurrentQuiz>>
}

export function GeneralQuizzesSection({ currentQuiz, setCurrentQuiz }: GeneralQuizzesSectionProps) {
  const { data } = useQuizzesQuery()

  const general = data.filter(quiz => quiz.moduleId === null)

  const [collapsed, setCollapsed] = useState(general.length > 3)
  const { measureRef, cardRef, height } = useHeightState(collapsed, general.length)

  return (
    <Section
      className="general-quizzes"
      padding={general.length > 3 ? "32px 120px 47px 120px" : undefined}
      animate={{ height }}
    >
      <motion.div
        className="general-quizzes-wrapper"
        ref={measureRef}
      >
        <h1>Общие викторины</h1>

        <QuizCardGroup>
          {general.map((quiz, index) => {
            const inProgress = quiz.id === currentQuiz.id && currentQuiz.status === "started"
            const disabled = quiz.id !== currentQuiz.id && currentQuiz.status === "started"

            return (
              <QuizCard
                key={index}
                ref={index === 0 ? cardRef : undefined}
                inProgress={inProgress}
                isCompleted={quiz.isCompleted ?? false}
                name={quiz.name}
                questionsCount={quiz.questions.length}
                disabled={inProgress ? currentQuiz.status !== 'completed' : disabled}
                onClick={() => {
                  setCurrentQuiz({ id: quiz.id, status: "selected", name: quiz.name })
                  queryClient.removeQueries({ queryKey: [...COMPLETE_QUIZ_KEY, currentQuiz.id], exact: true })
                }}
              />
            )
          })}
        </QuizCardGroup>

        {general.length > 3 &&
          <div
            className="expand-section-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="label">{collapsed ? "Показать все" : "Показать меньше"}</span>

            <ArrowVertical
              className={clsx({ collapsed })}
              width={9}
              height={9}
            />
          </div>
        }
      </motion.div>
    </Section>
  )
}
