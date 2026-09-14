import { motion, MotionProps } from 'framer-motion'
import { PropsWithChildren } from 'react'

export function SideBar({ children }: PropsWithChildren<{}>) {
  const animation: MotionProps = {
    initial: { y: "50%", opacity: 0, scale: 0.95 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: "-50%", opacity: 0, scale: 0.95, transition: { duration: 0.33, delay: 0.2 } },
    transition: { type: "spring", duration: 0.66, delay: 0.2 },
  }

  return (
    <motion.div
      className="sidebar-container"
      {...animation}
    >
      {children}
    </motion.div>
  )
}