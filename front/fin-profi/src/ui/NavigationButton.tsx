import { ComponentType, CSSProperties, ReactElement, SVGProps } from 'react'
import { Link, To, useLocation } from 'react-router'
import clsx from 'clsx'

import { COLORS } from '@/constants'

type NavigationButtonProps = {
  to: To,
  text: string,
  icon: ReactElement<
    SVGProps<SVGSVGElement>,
    ComponentType<SVGProps<SVGSVGElement>>
  >,
  style?: CSSProperties
}

export function NavigationButton({ to, text, icon, style }: NavigationButtonProps) {
  const location = useLocation()
  const isActive = location.pathname === `/${to}`

  return (
    <Link style={style} to={to}>
      <div
        className={clsx("nav-button", isActive ? "active" : "")}
      >
        <icon.type {...icon.props} fill={COLORS.TEXT} />
        <span>{text}</span>
      </div>
    </Link>
  )
}