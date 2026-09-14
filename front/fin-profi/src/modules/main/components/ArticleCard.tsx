import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Play } from '@/assets/icons'
import { COLORS } from '@/constants'
import { ExpandButton, ProgressCircle, Skeleton } from '@/ui'

import { Article } from '../constants'

type ArticleCardProps = Article & {
  ref: (node: HTMLDivElement | null) => void,
  isLoading: boolean
}

export function ArticleCard({ id, name, progress, isRead, ref, isLoading }: ArticleCardProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const navigate = useNavigate()

  return (
    <div
      className="article-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        alignSelf: id % 2 === 0 ? "flex-end" : "flex-start",
        pointerEvents: isLoading ? "none" : "initial"
      }}
      ref={ref}
      id={`article-${id}`}
    >
      <ProgressCircle
        value={progress}
        text={id}
        style={{ color: isRead ? COLORS.TEXT : COLORS.DARK_GRAY }}
      />

      <Skeleton width={66} height={20} show={isLoading}>
        <h4>{name}</h4>
      </Skeleton>

      <ExpandButton
        show={!isLoading && isHovering}
        delay={-0.2}
        icon={<Play />}
        onClick={() => navigate(`/articles/${id}`)}
      />
    </div>
  )
}
