import React, { CSSProperties, ReactNode, useState } from 'react'
import { AnimatePresence, motion, MotionProps, MotionStyle } from 'framer-motion'
import clsx from 'clsx'

type ExpandButtonProps = {
  icon: ReactNode,
  text?: string,
  primary?: boolean,
  delay?: number,
  onClick: React.MouseEventHandler<HTMLDivElement>,
  show?: boolean
}

export function ExpandButton({ icon, text, primary, delay, onClick, show = true }: ExpandButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClickable, setIsClickable] = useState(false)

  const animation: MotionProps = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: show ? 1 : 0, scale: 1, transition: { delay: 0.2 + (delay ?? 0) } },
    transition: { delay: 0.2 },
    whileHover: {
      padding: text ? "10px 16px" : "10px",
      scale: text ? 1 : 1.1
    },
    onAnimationComplete: () => setIsClickable(true),
  }

  const textAnimation: MotionProps = {
    initial: { opacity: 0, width: 0, marginRight: 0 },
    animate: { opacity: 1, width: "auto", marginRight: 5 },
    exit: { opacity: 0, width: 0, marginRight: 0 }
  }

  return (
    <motion.div
      className={clsx("expand-button", { primary })}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => {
        setTimeout(() => {
          setIsExpanded(false)
        }, 500)
      }}
      onClick={onClick}
      style={{ pointerEvents: !isClickable || !show ? "none" : "initial" }}
      {...animation}
    >
      <AnimatePresence>
        {text && isExpanded && (
          <motion.span
            className="text"
            {...textAnimation}
          >{text}</motion.span>
        )}
      </AnimatePresence>
      {icon}
    </motion.div>
  )
}