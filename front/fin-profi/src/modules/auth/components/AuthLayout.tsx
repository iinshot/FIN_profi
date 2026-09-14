import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

import { ExpandButton } from '@/ui'
import { ArrowLeft } from '@/assets/icons'
import Logo from '@/assets/logo.svg?react'

export function AuthLayout() {
  const navigate = useNavigate()

  return (
    <motion.div layout className="auth-layout">
      <ExpandButton
        icon={<ArrowLeft />}
        primary
        onClick={() => navigate(-1)}
      />

      <Logo />
    </motion.div>
  )
}
