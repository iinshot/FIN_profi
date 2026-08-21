import { Cup } from '@/assets/icons'
import { COLORS } from '@/constants'
import { NamedSection, Skeleton } from '@/ui'
import { useUserStore } from '@/store'
import { useErrorEffect, useParamsId } from '@/hooks'

import { useRatingQuery, useScrollRef } from '../hooks'
import { buildRankList, getRank, getTemplate } from '../helpers'
import '../style.scss'

export function RatingSection() {
  const ownerId = useParamsId("userId")
  const userId = useUserStore(state => state.id)!

  const {
    data = getTemplate(userId),
    isLoading,
    isError,
    error
  } = useRatingQuery(userId)
  const { count, list: rating } = data
  const userRank = getRank(userId, rating)
  const showSkeleton = isLoading || isError

  const { containerRef } = useScrollRef(showSkeleton, ownerId)
  const rankListElements = buildRankList(rating, ownerId, userId, showSkeleton)

  useErrorEffect(error)

  return (
    <NamedSection
      icon={<Cup height={14} width={14} />}
      text="Рейтинг"
      gap="12px"
      className="rating"
      ref={containerRef}
      grow
    >
      <div className="rank-list">
        {rankListElements}
      </div>

      <div className="rank-info">
        <span
          style={{ color: COLORS.TEXT }}
          className="body"
        >Вы на <Skeleton width={10} height={17} show={showSkeleton}>{userRank}</Skeleton>-м месте</span>
        <span
          style={{ color: COLORS.MID_GRAY }}
          className="small"
        >из <Skeleton width={10} height={13} show={showSkeleton}>{count}</Skeleton> участников</span>
      </div>
    </NamedSection>
  )
}
