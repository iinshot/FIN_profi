import { motion, MotionProps } from 'framer-motion'
import { Link } from 'react-router'
import clsx from 'clsx'

import { Crown, ProfileCircle } from '@/assets/icons'
import { COLORS } from '@/constants'

import { Highlight, RatingDetail } from '../constants'
import { useParamsId } from '@/hooks'
import { Skeleton } from '@/ui'

type Props = {
  rank: number,
  user: RatingDetail,
  highlight?: Highlight,
  delay?: number,
  showSkeleton: boolean,
  dataId?: number
}

export default function RankCard({ rank, user, highlight, delay, showSkeleton, dataId }: Props) {
  const currentUserId = useParamsId("userId")
  const color = user.id === currentUserId ? COLORS.PRIMARY_YELLOW : COLORS.TEXT
  const isDark = rank === 1 && user.id === currentUserId

  const animation: MotionProps = {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
    transition: { delay: 0.33 + (delay ?? 0) }
  }

  return (
    <motion.div
      className={clsx("rank-card", highlight)}
      data-id={dataId}
      {...animation}
    >
      <Skeleton width={8} height={23} show={showSkeleton} dark={isDark}>
        <span className="body rank-number">{rank}</span>
      </Skeleton>

      <Skeleton width={28} height={28} show={showSkeleton} dark={isDark}>
        <ProfileCircle width={28} height={28} />
      </Skeleton>

      <div className="user-data">
        <Skeleton width={120} height={17} show={showSkeleton} dark={isDark}>
          <Link to={`/profile/${user.id}`} >
            <span className="body username">
              {user.name}
            </span>
          </Link>
        </Skeleton>

        <Skeleton width={80} height={14} show={showSkeleton} dark={isDark}>
          <span
            style={{ color: COLORS.MID_GRAY }}
            className="small score"
          >{user.points} очков</span>
        </Skeleton>
      </div>

      {!showSkeleton && highlight?.includes("leader") && <Crown width={14} height={14} />}

      {!showSkeleton && highlight?.includes("you") && <span style={{ color }} className="small">Вы</span>}
    </motion.div>
  )
}