import { Dispatch, SetStateAction, useEffect } from 'react'

import { Section } from '@/ui'

import { CurrentQuiz } from '../constants'
import { QuizCardGroup } from './QuizCardGroup'
import { QuizCard } from './QuizCard'
import { useQuizzesQuery } from '../hooks'
import { Quiz } from '@/constants'
import { queryClient } from '@/api'
import { COMPLETE_QUIZ_KEY } from '@/modules/quiz-taking'

type QuizzesByModulesSectionProps = {
  currentQuiz: CurrentQuiz,
  setCurrentQuiz: Dispatch<SetStateAction<CurrentQuiz>>
}

export function QuizzesByModulesSection({ currentQuiz, setCurrentQuiz }: QuizzesByModulesSectionProps) {
  const { data } = useQuizzesQuery()

  const byModules = data.filter(quiz => quiz.moduleId !== null)
  const map = new Map(
    byModules.length === 0 ?
      [[1, []], [2, []]] :
      byModules.map(quiz => ([quiz.moduleId, [] as Quiz[]]))
  )

  byModules.forEach(quiz => {
    map.get(quiz.moduleId!)?.push(quiz)
  })

  const modules = Array.from(map.keys()).sort()

  useEffect(() => {
    if (byModules.length === 0 || currentQuiz.name) return

    const quiz = map.get(modules[0])!

    setCurrentQuiz({ id: quiz[0].id, status: "selected", name: quiz[0].name })
  }, [byModules])

  return (
    <Section
      className="quizzes-by-module"
    >
      <h1>По модулям</h1>

      {modules.map(moduleId =>
        <div
          key={moduleId}
          className="quizzes-by-module-elem"
        >
          <h2>Модуль {moduleId}</h2>

          <QuizCardGroup>
            {map.get(moduleId)!.map(quiz => {
              const inProgress = currentQuiz.id === quiz.id && currentQuiz.status === "started"
              const disabled = currentQuiz.id !== quiz.id && currentQuiz.status === "started"

              return (
                <QuizCard
                  key={quiz.id}
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
        </div>
      )}
    </Section>
  )
}
