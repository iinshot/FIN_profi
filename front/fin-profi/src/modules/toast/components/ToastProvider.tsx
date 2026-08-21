import { PropsWithChildren, useState } from 'react'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'

import { useToastStore } from '@/store'

import { ToastCard } from './ToastCard'
import { GAP, HEIGHT, WIDTH } from '../constants'
import { CollapseToast } from './CollapseToast'
import '../style.scss'
import { ConfirmToastCard } from './ConfirmToastCard'
import clsx from 'clsx'

type ToastProviderProps = PropsWithChildren<{
  className: string
}>

export function ToastProvider({ className, children }: ToastProviderProps) {
  const toasts = useToastStore(state => state.toasts)
  const confirmToast = useToastStore(state => state.confirmToast)
  const count = toasts.length

  const [collapsed, setCollapsed] = useState<boolean>(true)
  const shouldCollapse = count > 1 && !collapsed
  const shouldExpand = count > 1 && collapsed

  const animation: MotionProps = {
    initial: {
      opacity: 0,
      y: -100,
      scaleY: -1,
      x: (WIDTH - 27) / 2,
      zIndex: 10
    },

    animate: {
      opacity: 0.95,
      y: (HEIGHT + GAP) * count
    },

    exit: {
      opacity: 0,
      y: -100,
    }
  }

  return (
    <>
      <AnimatePresence>
        {confirmToast.isOpen && (
          <ConfirmToastCard
            header={"Вы уверены?"}
            message={confirmToast.message}
            confirmText="Продолжить"
            cancelText="Назад"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="toast-group"
        onClick={() => { shouldExpand && setCollapsed(false) }}
        initial={{ transition: { delayChildren: 0.05 } }}
      >
        <AnimatePresence>
          {toasts.map((toast, index) => {
            const props = { collapsed, toast, index, count }

            return (
              <ToastCard
                key={toast.id}
                {...props}
              />
            )
          })}

          {shouldCollapse && (
            <CollapseToast
              onClick={() => setCollapsed(true)}
              {...animation}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <div className={clsx(className, { focus: confirmToast.isOpen })}>
        {children}
      </div>
    </>
  )
}