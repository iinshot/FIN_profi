import { SVGProps } from 'react'
import { useNavigate } from 'react-router'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import { Email, Password, Profile } from '@/assets/icons'
import { COLORS } from '@/constants'
import { Button, Input } from '@/ui'
import { useToastStore, useUserStore } from '@/store'

import type { RegisterRequest } from '../api'
import { register } from '../api'
import { trigger } from '@/modules/local-progress'

export function RegisterForm() {
  const navigate = useNavigate()
  const { register: inputRegister, handleSubmit } = useForm<RegisterRequest & { "password-confirmation": string }>()

  const showToast = useToastStore(state => state.showToast)
  const setToken = useUserStore(state => state.setToken)

  const iconProps: SVGProps<SVGSVGElement> = {
    width: 14,
    height: 14,
    fill: COLORS.MID_GRAY
  }

  const onSubmit: SubmitHandler<RegisterRequest & { "password-confirmation": string }> = async (data) => {
    try {
      const response = await register(data)
      setToken(response.data.access_token)

      navigate("/quizzes")

      const { error } = await trigger()

      if (error !== null) {
        showToast("Не удалось синхронизировать")
      }
    } catch (error) {
      showToast("Произошла ошибка")
    }
  }

  const onError: SubmitErrorHandler<RegisterRequest & { "password-confirmation": string }> = (errors) => {
    const messages = Object.entries(errors)

    messages.forEach(([_, { message }]) => {
      if (!message) return

      showToast(message)
    })
  }

  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit, onError)}>
      <Input
        id="username-input"
        icon={<Profile {...iconProps} />}
        placeholder="Введите имя пользователя"
        text="Имя пользователя"
        {...inputRegister("name", {
          required: {
            value: true,
            message: "Поле Имя пользовательно обязательное"
          }
        })}
        delay={0.2}
      />

      <Input
        id="email-input"
        icon={<Email {...iconProps} />}
        placeholder="Введите email"
        text="Email"
        {...inputRegister("email", {
          required: {
            value: true,
            message: "Поле Email обязательное"
          },
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Некорректный формат почты"
          }
        })}
        delay={0.15}
      />

      <Input
        id="password-input"
        placeholder="Введите пароль"
        text="Пароль"
        type="password"
        {...inputRegister("password", {
          required: {
            value: true,
            message: "Поле Пароль обязательное"
          },
          minLength: {
            value: 8,
            message: "Минимальная длина пароля — 8 символов"
          }
        })}
        icon={<Password {...iconProps} />}
        delay={0.1}
      />

      <Input
        id="password-confirmation-input"
        placeholder="Повторите пароль"
        text="Подтверждение пароля"
        type="password"
        {...inputRegister("password-confirmation", {
          validate: (value, formValues) => formValues.password === value || "Пароли не совпадают"
        })}
        icon={<Password {...iconProps} />}
        delay={0.05}
      />

      <Button
        text="Зарегистрироваться"
        primary
        type="submit"
      />
    </form>
  )
}
