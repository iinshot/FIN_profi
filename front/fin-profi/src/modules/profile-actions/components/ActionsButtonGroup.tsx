import React, { RefObject, useCallback, useState } from 'react'

import { Check, Exit, Pencil, Share, X } from '@/assets/icons'
import { ButtonGroup } from '@/components'
import { BASE_URL, STATUS, User } from '@/constants'
import { useProgressStore, useUserStore } from '@/store'
import { ExpandButton } from '@/ui'
import { useParamsId } from '@/hooks'

import { useEnterKeyEffect, useUserMutation } from '../hooks'

type Props = {
  isEditing: boolean,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  isLocked: boolean,
  userRef: RefObject<Pick<User, "name" | "email"> | null>,
  user: Pick<User, "name" | "email">,
  setUser: React.Dispatch<React.SetStateAction<Pick<User, "name" | "email">>>
}

export default function ActionsButtonGroup({ isEditing, setIsEditing, isLocked, userRef, user, setUser }: Props) {
  const currentUserId = useUserStore(state => state.id)
  const ownerId = useParamsId("userId")

  const shouldShow = ownerId === currentUserId

  const setStatus = useProgressStore(state => state.setStatus)
  const logout = useUserStore(state => state.logout)
  const [copied, setCopied] = useState(false)

  const { mutate } = useUserMutation()

  const handleAccept = useCallback(() => {
    mutate({ id: ownerId, params: user })
    userRef.current = null
    setIsEditing(false)
  }, [ownerId, user])

  useEnterKeyEffect(isEditing, handleAccept)

  if (isEditing) return (
    <ButtonGroup key="while-editing">
      <ExpandButton
        icon={<X />}
        text="Отменить"
        onClick={async () => {
          setIsEditing(false)

          if (!userRef.current) return

          setUser(userRef.current)
        }}
      />

      <ExpandButton
        icon={<Check />}
        text="Принять"
        primary
        onClick={handleAccept}
      />
    </ButtonGroup>
  )

  return (
    <ButtonGroup key="while-watching">
      {shouldShow && <ExpandButton
        icon={<Exit />}
        text="Выйти"
        onClick={() => {
          logout()
          setStatus(STATUS.WAITING)
        }}
      />}

      <ExpandButton
        icon={copied ? <Check /> : <Share />}
        text={copied ? "Скопировано" : "Поделиться"}
        delay={0.1}
        onClick={async () => {
          await navigator.clipboard.writeText(`${BASE_URL}/profile/${ownerId}`.replace('/api', ''))

          setCopied(true)

          setTimeout(() => setCopied(false), 1000)
        }}
      />

      {shouldShow && <ExpandButton
        icon={<Pencil />}
        text="Редактировать"
        delay={0.2}
        onClick={() => {
          if (isLocked) return

          userRef.current = user
          setIsEditing(true)
        }}
        primary
      />}
    </ButtonGroup>
  )
}
