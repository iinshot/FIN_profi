import { Link } from 'react-router'

import { Divider } from '@/ui'

import { LoginForm } from './LoginForm'
import { motion } from 'framer-motion'

export function Login() {
  return (
    <div className="login">
      <motion.div layout className="head">
        <h2>Вход в систему</h2>
        <span className="body">Добро пожаловать обратно! Введите свои данные.</span>
      </motion.div>

      <LoginForm />

      <Divider>
        <div className="solid"></div>
        <span className="label">Или</span>
        <div className="solid"></div>
      </Divider>

      <div className="suggestion">
        <span className="body">Нет аккаунта?</span>

        <Link
          to="/register"
          replace
          className="link body"
        >Зарегистрироваться</Link>
      </div>
    </div>
  )
}