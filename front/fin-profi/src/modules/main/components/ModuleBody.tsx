import { useLayoutEffect, useRef } from 'react'

import { ArticleCard } from './ArticleCard'
import { Curve } from './Curve'
import { useCardRefs, usePointsState } from '../hooks'
import { Article } from '../constants'

type Props = {
  articles?: Article[],
  isLoading: boolean
}

export function ModuleBody({ articles, isLoading }: Props) {
  const { cardRefs, setCardRefs } = useCardRefs()
  const containerRef = useRef<HTMLDivElement>(null)

  const { points, resizeObserver } = usePointsState(cardRefs.current, articles)

  useLayoutEffect(() => {
    if (!containerRef.current) return

    resizeObserver.observe(containerRef.current)
  }, [containerRef])

  return (
    <div className="module-body" ref={containerRef}>
      <span className="label">Статьи</span>

      <div className="article-cards">
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            ref={setCardRefs(article.id)}
            isLoading={isLoading}
            {...article}
          />
        ))}
      </div>

      {points.length > 0 &&
        <svg>
          {points.map((point, index) => {
            if (index === points.length - 1) return null

            return (
              <Curve
                key={point.articleId}
                progress={articles?.at(index)?.progress ?? 0}
                from={point}
                to={points[index + 1]}
                isRead={articles?.at(index)?.isRead ?? false}
              />
            )
          })}
        </svg>
      }
    </div>
  )
}
