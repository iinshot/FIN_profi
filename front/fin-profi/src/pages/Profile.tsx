import { useEffect } from 'react'

import { Content, SideBar } from '@/ui'
import { ProfileInfoSection } from '@/modules/profile-actions'
import { StatisticsSection } from '@/modules/statistics'
import { ActivitySection } from '@/modules/activity'
import { NextRankSection, RatingSection } from '@/modules/rating'
import { useProgressStore, useToastStore } from '@/store'
import { STATUS } from '@/constants'

export default function Profile() {
  const status = useProgressStore(state => state.status)
  const showToast = useToastStore(state => state.showToast)

  useEffect(() => {
    if (status !== STATUS.SYNCING) return

    showToast("Данные могут быть неактуальны")
  }, [status])

  return (
    <>
      <Content>
        <ProfileInfoSection />

        <StatisticsSection />

        <ActivitySection />
      </Content>

      <SideBar>
        <RatingSection />

        <NextRankSection />
      </SideBar>
    </>
  )
}