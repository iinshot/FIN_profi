import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type StatusLabelProps = PropsWithChildren<{
  type: string
}>

export function StatusLabel({ type, children }: StatusLabelProps) {
  return <span className={clsx("small", "status", type)}>{children}</span>
}
