import { useEffect } from 'react'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'

import { AUTH, STATUS } from '@/constants'
import Logo from '@/assets/logo.svg?react'
import { Calc, Home, Login, Profile, Quiz } from '@/assets/icons'
import { SyncProgress, trigger } from '@/modules/local-progress'
import { useProgressStore, useToastStore, useUserStore } from '@/store'
import { NavigationButton, Divider } from '@/ui'

export function NavigationBar() {
  const auth = useUserStore(state => state.auth)
  const status = useProgressStore(state => state.status)
  const showToast = useToastStore(state => state.showToast)

  const animation: MotionProps = {
    initial: { y: "50%", opacity: 0, scale: 0.95 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: "-50%", opacity: 0, scale: 0.95, transition: { duration: 0.33, delay: 0.1 } },
    transition: { type: "spring", duration: 0.66, delay: 0.1 }
  }

  const id = useUserStore(state => state.id)

  useEffect(() => {
    if (status !== STATUS.ERROR) return

    (async () => {
      const { error } = await trigger()

      if (error !== null) showToast("Не удалось синхронизировать")
    })()
  }, [status])

  return (
    <motion.div
      className="navbar-container"
      {...animation}
    >
      <div className="navbar">
        <Logo />

        <Divider />

        <nav>
          <div className="nav-button-group">
            <NavigationButton
              to=""
              icon={<Home />}
              text="Главная"
            />

            <NavigationButton
              to="calculators"
              icon={<Calc />}
              text="Калькуляторы"
            />

            <NavigationButton
              to="quizzes"
              icon={<Quiz />}
              text="Викторины"
            />
          </div>

          <div className="nav-button-group">
            <AnimatePresence>
              {status === STATUS.SYNCING && <SyncProgress />}
            </AnimatePresence>

            {auth === AUTH.GUEST ?
              <NavigationButton
                to="login"
                icon={<Login />}
                text="Войти"
              /> :
              <NavigationButton
                to={`profile/${id}`}
                icon={<Profile />}
                text="Профиль"
              />
            }
          </div>
        </nav>
      </div>
    </motion.div>
  )
}