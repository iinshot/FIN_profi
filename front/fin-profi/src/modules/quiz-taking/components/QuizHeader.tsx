import { PropsWithChildren } from 'react'

import { Quiz } from '@/assets/icons'
import { Skeleton } from '@/ui'

type QuizHeaderProps = PropsWithChildren<{
  count?: number,
  name?: string,
  isLoading: boolean,
}>

export function QuizHeader({ count, name, isLoading, children }: QuizHeaderProps) {
  return (
    <div className="quiz-taking-header">
      <div className="quiz-taking-header-content">
        <Quiz width={16} height={16} />

        <div className="quiz-taking-header-info">
          <h2>{name ?? "Проверь себя"}</h2>
          <Skeleton width={50} height={18} show={isLoading}>
            <div className="small">{count} вопр.</div>
          </Skeleton>
        </div>
      </div>

      {children}
    </div>
  )
}