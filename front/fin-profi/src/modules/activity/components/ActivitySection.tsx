import { Invest } from "@/assets/icons"
import { NamedSection } from "@/ui"

import { ActivityCard } from "./ActivityCard"
import { useActivityQuery } from "../hooks"
import { SKELETON_ACTIVITY } from '../constants'
import "../style.scss"
import { useErrorEffect } from '@/hooks'

export function ActivitySection() {
  const {
    data: activity = SKELETON_ACTIVITY,
    isLoading,
    isError,
    error
  } = useActivityQuery()

  useErrorEffect(error)

  return (
    <NamedSection
      icon={<Invest />}
      text="Недавняя активность"
      padding="32px 40px"
      gap="24px"
      className="activity"
      grow
    >
      {activity.map((activityObj, index) => (
        <ActivityCard
          key={index}
          {...activityObj}
          delay={0.05 * index}
          showSkeleton={isLoading || isError}
        />
      ))}
    </NamedSection>
  )
}
