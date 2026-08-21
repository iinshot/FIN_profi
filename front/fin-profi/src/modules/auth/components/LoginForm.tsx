import axios from "axios"
import { SVGProps } from "react"
import { useNavigate } from "react-router"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"

import { Password, Profile } from "@/assets/icons"
import { COLORS, STATUS } from "@/constants"
import { showConfirmToast } from '@/modules/toast'
import { useProgressStore, useToastStore, useUserStore } from "@/store"
import { Button, Input } from "@/ui"

import { type LoginRequest, login } from "../api"

export function LoginForm() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginRequest>()

  const setToken = useUserStore(state => state.setToken)
  const showToast = useToastStore(state => state.showToast)
  const setStatus = useProgressStore(state => state.setStatus)
  const articles = useProgressStore(state => state.articles)

  const iconProps: SVGProps<SVGSVGElement> = {
    width: 14,
    height: 14,
    fill: COLORS.MID_GRAY
  }

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    if (articles.length !== 0) {
      const ok = await showConfirmToast("Ваши локальные данные будут удалены. Если хотите их сохранить, пожалуйста, зарегистрируйтесь.")

      if (!ok) return
    }

    try {
      const response = await login(data)
      setToken(response.data.access_token)

      setStatus(STATUS.CLOSED)

      navigate("/")
    } catch (error) {
      if (axios.isAxiosError(error))
        if (error.status === 401) {
          showToast("Неверные логин или пароль")
          return
        }

      showToast("Произошла ошибка")
    }
  }

  const onError: SubmitErrorHandler<LoginRequest> = ({ email, password }) => {
    if (email?.message) {
      showToast(email.message)
    }

    if (password?.message) {
      showToast(password.message)
    }
  }

  return (
    <form id="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
      <Input
        id="login-input"
        placeholder="Введите email"
        text="Email"
        {...register("email", {
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Некорректный формат почты"
          },
          required: {
            value: true,
            message: "Поле Email обязательное"
          }
        })}
        icon={<Profile {...iconProps} />}
        delay={0.1}
      />

      <Input
        id="password-input"
        placeholder="Введите пароль"
        text="Пароль"
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Поле Пароль обязательное"
          }
        })}
        icon={<Password {...iconProps} />}
        delay={0.05}
      />

      <Button
        text="Войти"
        primary
        type="submit"
      />
    </form>
  )
}
