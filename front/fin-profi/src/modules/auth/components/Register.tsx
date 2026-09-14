import { Link } from 'react-router'
import { motion } from 'framer-motion'

import { Divider } from '@/ui'

import { RegisterForm } from './RegisterForm'

export function Register() {
  return (
    <div className="register">
      <motion.div layout className="head">
        <h2>Регистрация</h2>
        <span className="body">Создайте аккаунт, чтобы сохранить прогресс.</span>
      </motion.div>

      <RegisterForm />

      <Divider>
        <div className="solid"></div>
        <span className="label">Или</span>
        <div className="solid"></div>
      </Divider>

      <div className="suggestion">
        <span className="body">Уже есть аккаунт?</span>

        <Link
          to="/login"
          replace
          className="link body"
        >Войти</Link>
      </div>
    </div>
  )
}
