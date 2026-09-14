import { SVGProps } from 'react'
import { motion } from 'framer-motion'

import { ArrowVertical } from '@/assets/icons'
import { COLORS } from '@/constants'

const BaseCollapseToast = (props: SVGProps<SVGSVGElement>) => (
  <ArrowVertical
    fill={COLORS.SURFACE_WHITE}
    className="toast-collapse"
    {...props}
  />
)

export const CollapseToast = motion.create(BaseCollapseToast, { forwardMotionProps: true })
