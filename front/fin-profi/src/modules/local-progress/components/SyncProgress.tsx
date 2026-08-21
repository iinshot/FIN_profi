import { motion, Variants } from 'framer-motion'

import { useProgressStore } from '@/store'

import '../style.scss'

export function SyncProgress() {
  const progress = useProgressStore(state => state.progress)

  const variants: Variants = {
    hide: {
      padding: "0",
      height: 0,
      opacity: 0
    },
    show: {
      padding: "10px 0",
      height: "auto",
      opacity: 1
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="hide"
      animate="show"
      exit="hide"
      transition={{ delay: 0.7 }}
      className="sync-progress"
    >
      <span className="digits">{progress}%</span>
      <span className="label">Синхронизация</span>
    </motion.div>
  )
}
