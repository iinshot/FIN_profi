import clsx from 'clsx'
import { motion, MotionProps, TargetAndTransition } from 'framer-motion'
import { CSSProperties, PropsWithChildren, RefObject } from 'react'

type SectionProps = PropsWithChildren<{
  className?: string,
  style?: CSSProperties,
  padding?: string,
  grow?: boolean,
  ref?: RefObject<HTMLDivElement | null>
} & MotionProps>

export function Section({ children, padding, className, style, grow, ref, ...motionProps }: SectionProps) {
  return (
    <motion.section
      className={clsx(className, { grow })}
      style={{ ...style, padding: padding ?? "32px 120px" }}
      ref={ref}
      {...motionProps}
    >
      {children}
    </motion.section>
  )
}
