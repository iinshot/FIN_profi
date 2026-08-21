import { MotionProps } from 'framer-motion'

import { NamedSection, ProgressBar } from '@/ui'
import { Star } from '@/assets/icons'
import { COLORS } from '@/constants'
import { useParamsId } from '@/hooks'

import { getRank, getTemplate } from '../helpers'
import { useRatingQuery } from '../hooks'

export function NextRankSection() {
  const currentUserId = useParamsId("userId")

  const { data = getTemplate(currentUserId) } = useRatingQuery(currentUserId)
  const { list: rating } = data

  const currentRank = getRank(currentUserId, rating)

  const currentUser = rating.at(currentRank - 1)
  const nextUser = rating.at(currentRank - 2)

  if (currentRank === 1 ||
    !currentUser ||
    !nextUser ||
    currentUser.points === nextUser.points) return null

  const animation: MotionProps = {
    initial: {
      height: 0,
      opacity: 0,
      paddingTop: 0,
      paddingBottom: 0
    },
    animate: {
      height: "auto",
      opacity: 1,
      paddingTop: 24,
      paddingBottom: 24
    }
  }

  return (
    <NamedSection
      icon={<Star />}
      text="До следующего места"
      gap="8px"
      className="next-rank"
      animation={animation}
    >
      <div className="content-header">
        <div className="points">
          <span
            style={{ color: COLORS.TEXT }}
            className="digits"
          >{nextUser.points - currentUser.points}</span>

          <span
            style={{ color: COLORS.MID_GRAY }}
            className="small"
          >очков осталось</span>
        </div>

        <div className="currentUser">
          <span
            style={{ color: COLORS.TEXT }}
            className="body"
          >{currentRank - 1}-е место</span>

          <span
            style={{ color: COLORS.MID_GRAY }}
            className="small"
          >{nextUser.name}</span>
        </div>
      </div>

      <ProgressBar
        value={currentUser.points / nextUser.points * 100}
        height={8}
      />

      <span
        style={{
          color: COLORS.MID_GRAY,
          textAlign: "center"
        }}
        className="small"
      >{currentUser.points} / {nextUser.points} очков</span>
    </NamedSection>
  )
}
