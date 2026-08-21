import { Outlet } from 'react-router'

import { Section } from '@/ui'

import { AuthLayout } from './AuthLayout'
import '../style.scss'

export function AuthSection() {
  return (
    <Section
      padding="0 40px"
      className="auth-section"
      layout
    >
      <AuthLayout />

      <Outlet />
    </Section>
  )
}