import { motion, MotionProps } from 'framer-motion'

type ProgressBarProps = {
  value: number,
  height: number
}

export function ProgressBar({ value, height }: ProgressBarProps) {
  const animation: MotionProps = {
    initial: { width: 0 },
    animate: { width: `${value}%`, transition: { delay: 0.33 } }
  }

  return (
    <div
      style={{
        height: `${height}px`,
        borderRadius: `${height / 2}px`
      }}
      className="progress-bar"
    >
      <motion.div
        className="progress"
        {...animation}
      ></motion.div>
    </div>
  )
}