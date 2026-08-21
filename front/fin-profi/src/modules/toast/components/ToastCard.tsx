import { motion } from 'framer-motion'

import { Toast } from '@/constants'

import { getVariants } from '../helpers'
import { useAnimateClose } from '../hooks'

type ToastCardProps = {
  toast: Toast,
  collapsed: boolean,
  index: number,
  count: number
}

export function ToastCard({ toast, collapsed, index, count }: ToastCardProps) {
  const shouldCollapse = count > 1 && collapsed
  const variants = getVariants(count)

  const scope = useAnimateClose(index, toast.id)

  return (
    <motion.div
      key={toast.id}
      className="toast"
      ref={scope}
      onClick={shouldCollapse ? () => { } : toast.action}
      custom={index}
      variants={variants}
      initial="initial"
      animate={shouldCollapse ? "collapse" : "expand"}
      whileHover={shouldCollapse ? "hover" : {}}
      exit="initial"
    >
      <div className="body">{toast.message}</div>
    </motion.div>
  )
}
