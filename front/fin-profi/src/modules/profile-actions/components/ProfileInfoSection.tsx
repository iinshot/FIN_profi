import { useRef, useState } from 'react'

import { ProfileCircle } from '@/assets/icons'
import { Section, Skeleton } from '@/ui'
import { useUserStore } from '@/store'
import { useParamsId } from '@/hooks'
import { User } from '@/constants'

import ActionsButtonGroup from './ActionsButtonGroup'
import { useInitFields } from '../hooks'
import '../style.scss'

export function ProfileInfoSection() {
  const ownerId = useParamsId("userId")
  const currentUserId = useUserStore(state => state.id)

  const isOwner = ownerId === currentUserId

  const [isEditing, setIsEditing] = useState(false)
  const { fields, setFields, isLoadingSkeleton } = useInitFields(ownerId)
  const fieldsRef = useRef<Pick<User, "name" | "email">>(null)

  return (
    <Section
      padding="32px 40px"
      className="user-info"
    >
      <ProfileCircle width={96} height={96} />

      <div className="user-credentials">
        <Skeleton
          show={isLoadingSkeleton}
          width={200}
          height={47}
        >
          <input
            name="username"
            type="text"
            value={fields?.name ?? ""}
            className="h1"
            readOnly={!isEditing}
            onChange={(e) => setFields(prev => ({ ...prev, name: e.target.value }))}
          />
        </Skeleton>

        {isOwner &&
          <Skeleton
            show={isLoadingSkeleton}
            width={160}
            height={31}
          >
            <input
              name="email"
              type="text"
              value={fields?.email ?? ""}
              className="body"
              readOnly={!isEditing}
              onChange={(e) => setFields(prev => ({ ...prev, email: e.target.value }))}
            />
          </Skeleton>
        }
      </div>

      <ActionsButtonGroup
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isLocked={isLoadingSkeleton}
        userRef={fieldsRef}
        user={fields}
        setUser={setFields}
      />
    </Section>
  )
}