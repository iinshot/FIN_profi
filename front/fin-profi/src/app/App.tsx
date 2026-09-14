import { Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'

import { NavigationBar, ProtectedRoutes } from '@/components'
import { Login, Register } from '@/modules/auth'
import { ToastProvider } from '@/modules/toast'
import { useRehydrateEffect } from '@/modules/local-progress'
import { Main, Calculators, Quizzes, Profile, Article, NotFound, Auth } from '@/pages'
import './App.scss'

export default function App() {
  const location = useLocation()

  const show = ["/login", "/register"].every(path => path != location.pathname)

  useRehydrateEffect()

  return (
    <ToastProvider className="container">
      <AnimatePresence>
        {show && <NavigationBar />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <main key={show ? location.pathname : "no-animate"}>
          <Routes location={location}>
            <Route path="/" element={<Main />} />
            <Route path="/articles/:articleId" element={<Article />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/*" element={<NotFound />} />

            <Route element={<Auth />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route path="/profile/:userId" element={<Profile />} />
            </Route>
          </Routes>
        </main>
      </AnimatePresence>
    </ToastProvider>
  )
}
