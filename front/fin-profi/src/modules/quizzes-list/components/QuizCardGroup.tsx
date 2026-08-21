import { AnimatePresence } from 'framer-motion'
import { ReactNode, useMemo } from 'react'

import { Skeleton } from '@/ui'

type QuizCardGroupProps = {
  children: ReactNode[]
}

export function QuizCardGroup({ children }: QuizCardGroupProps) {
  const array = useMemo(() => Array.from({ length: Math.ceil(Math.random() * 3) }), [])

  return (
    <div className="quiz-card-group">
      {children.length === 0 ?
        array.map((_, index) =>
          <Skeleton
            key={index}
            width={320}
            height={170}
            show={true}
          />
        ) :
        children
      }
    </div>
  )
}
