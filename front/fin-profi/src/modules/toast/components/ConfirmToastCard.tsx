import { useToastStore } from '@/store'
import { Divider } from '@/ui'
import { motion, MotionProps, Variants } from 'framer-motion'

type ConfirmToastCardProps = {
  header: string | null,
  message: string | null,
  confirmText: string,
  cancelText: string
}

export function ConfirmToastCard({ header, message, confirmText, cancelText }: ConfirmToastCardProps) {
  const confirm = useToastStore(state => state.confirm)
  const cancel = useToastStore(state => state.cancel)

  const variants: Variants = {
    hide: {
      top: -200,
      scale: 0.8
    },

    show: {
      top: 12,
      scale: 1
    }
  }

  if (!message) return

  return (
    <motion.div
      variants={variants}
      initial="hide"
      animate="show"
      exit="hide"
      className="confirm-toast"
    >
      <h3>{header}</h3>
      <Divider />
      <span className="body">{message}</span>
      <div className="confirm-toast-button-group">
        <button
          className="confirm-toast-button confirm body"
          onClick={() => confirm()}
        >{confirmText}</button>

        <button
          className="confirm-toast-button cancel body"
          onClick={() => cancel()}
        >{cancelText}</button>
      </div>
    </motion.div>
  )
}
