import { ProgressBar } from '@/ui'
import { useMemo } from 'react'

type QuizProgressProps = {
  progress: number,
  count?: number
}

export function QuizProgress({ count, progress }: QuizProgressProps) {
  if (!count) count = 4

  const arr = useMemo(() => {
    return Array.from({ length: count })
  }, [count])

  return (
    <div className="quiz-taking-progress">
      <div className="quiz-taking-progress-group">
        {arr.map((_, index) => {
          const value = (index + 1 <= progress) ? 100 : 0

          return (
            <ProgressBar
              key={index}
              height={8}
              value={value}
            />
          )
        })}
      </div>

      <div className="small">Вопрос {progress} из {count}</div>
    </div>
  )
}