import { useEffect } from 'react'
import { motion } from 'framer-motion'

import { ProgressCircle } from '@/ui'
import { useUserQuery, usePointsMutation } from '@/hooks'

import { buildResult } from '../helpers'
import { useCompleteQuizQuery, useQuizQuery } from '../hooks'
import { POINTS_PER_QUIZ } from '@/constants'

export function Results() {
  const { data, isPending } = useCompleteQuizQuery()
  const quizResponse = useQuizQuery()
  const userResponse = useUserQuery()
  const { mutate } = usePointsMutation()

  const rightCount = data!.right.length
  const questionsCount = rightCount + data!.wrong.length

  const result = buildResult(rightCount, questionsCount)

  useEffect(() => {
    if (
      isPending ||
      userResponse.isPending ||
      userResponse.isError ||
      rightCount !== questionsCount ||
      quizResponse.data?.isCompleted
    ) return

    mutate({
      id: userResponse.data.id,
      params: {
        points: userResponse.data.points + POINTS_PER_QUIZ
      }
    })
  }, [isPending, userResponse.isPending, userResponse.isError])

  return (
    <div className="results">
      <div className="results-header">
        <ProgressCircle value={rightCount / questionsCount * 100} text={rightCount} />

        <h2>{rightCount === questionsCount ?
          "Викторина пройдена!" :
          "Викторина не пройдена"}
        </h2>

        <span className="body">{rightCount === questionsCount ?
          `Отличная работа! Вы успешно завершили викторину по теме «${quizResponse.data?.name}»` :
          `Попробуйте позже пройти викторину по теме «${quizResponse.data?.name}»`}
        </span>
      </div>

      <div className="results-info">
        {result.map((res, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 * (index + 1) }}
            className="results-info-card"
          >
            <h1>{res.value}</h1>
            <div className="small">{res.text}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}