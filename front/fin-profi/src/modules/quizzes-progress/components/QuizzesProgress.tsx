import { Pie } from '@/assets/icons'

import { useQuizzesQuery } from '@/modules/quizzes-list'
import { NamedSection, ProgressCircle, Skeleton } from '@/ui'

import { extractStatistics } from '../helpers'
import '../styles.scss'

export function QuizzesProgress() {
  const { data, isPending, isError } = useQuizzesQuery()

  const { count, statistics } = extractStatistics(data)

  const completedCount = statistics[1].value

  return (
    <NamedSection
      text="Ваш прогресс"
      padding="24px"
      icon={<Pie width={13} height={13} />}
      className="quizzes-progress"
      grow
    >
      <ProgressCircle
        text={completedCount}
        value={completedCount / (count === 0 ? 1 : count) * 100}
      />

      <div className="quizzes-progress-statistics">
        {statistics.map(obj =>
          <Skeleton
            key={obj.text}
            height={50}
            show={isPending || isError}
          >
            <div className="quizzes-progress-statistics-card">
              <h3>{obj.value}</h3>

              <div className="body">{obj.text}</div>
            </div>
          </Skeleton>
        )}
      </div>
    </NamedSection>
  )
}
