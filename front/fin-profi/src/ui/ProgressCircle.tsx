import clsx from 'clsx'
import { motion, MotionProps } from 'framer-motion'
import { CSSProperties } from 'react'

type ProgressCircleProps = {
  value: number,
  text: number,
  large?: boolean,
  style?: CSSProperties
}

export function ProgressCircle({ value, text, large, style }: ProgressCircleProps) {
  const animation: MotionProps = {
    initial: { background: `conic-gradient(var(--primary-yellow) ${0}%, var(--surface-light) ${0}%)` },
    animate: { background: `conic-gradient(var(--primary-yellow) ${value}%, var(--surface-light) ${value}%)` },
    transition: { delay: 0.33 }
  }

  return (
    <motion.div
      className={clsx("progress-circle", { large })}
      style={style}
      {...animation}
    >
      <div className="progress">
        <span>{text}</span>
      </div>
    </motion.div>
  )
}