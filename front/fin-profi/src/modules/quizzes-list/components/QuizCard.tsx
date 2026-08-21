import clsx from 'clsx'

import { getStatus } from "../helpers"
import "../style.scss"
import { Button, StatusLabel } from '@/ui'
import { Energy, Quiz, Restart } from '@/assets/icons'
import { POINTS_PER_QUIZ } from '@/constants'
import { RefObject } from 'react'
import { motion, MotionProps } from 'framer-motion'

type QuizCardProps = {
  inProgress: boolean,
  isCompleted: boolean,
  name: string,
  questionsCount: number,
  onClick: () => void,
  ref?: RefObject<HTMLDivElement | null>,
  disabled: boolean
}

export function QuizCard({ inProgress, isCompleted, name, questionsCount, onClick, ref, disabled }: QuizCardProps) {
  const status = getStatus(inProgress, isCompleted)

  const animation: MotionProps = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: Math.random() / 10 }
  }

  return (
    <motion.div
      {...animation}
      className={clsx("quiz-card", { dark: inProgress })}
      ref={ref}
    >
      <h2>{name}</h2>

      <div className="label-group">
        <div className="question-label">
          <Quiz width={12} height={12} />

          <div className="small">{questionsCount} вопр.</div>
        </div>

        {!isCompleted && <div className="points-label">
          <Energy width={12} height={12} />

          <div className="small">+{POINTS_PER_QUIZ} очков</div>
        </div>}

        <StatusLabel type={inProgress || isCompleted ? "active" : "inactive"}>{status}</StatusLabel>
      </div>

      <Button
        text={isCompleted ? "Перепройти" : "Пройти"}
        right={isCompleted ? <Restart width={10} height={10} /> : undefined}
        onClick={onClick}
        className={clsx({ disabled })}
        primary
      />
    </motion.div>
  )
}
