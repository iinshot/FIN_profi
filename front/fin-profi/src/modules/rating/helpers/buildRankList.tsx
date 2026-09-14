import { ReactNode } from "react"
import clsx from "clsx"

import { Divider } from "@/ui"
import { COLORS } from "@/constants"

import RankCard from "../components/RankCard"
import { Highlight, RatingDetail } from "../constants"
import { getRank } from './getRank'

export function buildRankList(
  rating: RatingDetail[],
  ownerId: number,
  userId: number,
  isLoading: boolean
) {
  let elements: ReactNode[] = []

  const ownerRank = getRank(ownerId, rating)
  const userRank = getRank(userId, rating)

  const currentUser = rating[userRank - 1]
  const nextUser = rating[userRank - 2]

  const start = 0
  const end = 8 +
    Number(userRank === 9 || userRank === 10) +
    Number(userRank === 10)

  elements = elements.concat(rating
    .slice(start, end)
    .map((user, index) => (
      <RankCard
        key={start + index}
        highlight={
          clsx(
            !isLoading && index === 0 && "leader",
            index === ownerRank - 1 && "current-user",
            index === userRank - 1 && "you"
          ) as Highlight
        }
        dataId={index === ownerRank - 1 ? ownerId : undefined}
        rank={index + 1}
        user={user}
        delay={0.025 * index}
        showSkeleton={isLoading}
      />
    ))
  )

  if (userRank > 10) {
    elements = elements.concat([
      <Divider key={end}>
        <div className="dashed-line"></div>
        <span style={{ color: COLORS.BACKGROUND }} className="label">•••</span>
        <div className="dashed-line"></div>
      </Divider>,

      <RankCard
        key={end + 1}
        rank={userRank - 1}
        user={nextUser}
        delay={0.025 * 8}
        highlight={
          clsx(
            nextUser.id === ownerId && "current-user"
          ) as Highlight
        }
        showSkeleton={isLoading}
        dataId={nextUser.id === ownerId ? ownerId : undefined}
      />,

      <RankCard
        key={end + 2}
        rank={userRank}
        highlight={
          clsx(
            userId === ownerId && "current-user",
            "you"
          ) as Highlight
        }
        user={currentUser}
        delay={0.025 * 9}
        showSkeleton={isLoading}
        dataId={userId === ownerId ? ownerId : undefined}
      />
    ])
  }

  return elements
}