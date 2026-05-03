import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router'
import { Content, Section } from '../../components'

export default function AuthLayout() {
  const navigate = useNavigate()

  return (
    <Content style={{ justifyContent: "center", alignItems: "center" }}>
      <button onClick={() => navigate(-1)}>Назад</button>
      <div>
        Здесь общий шаблон под страницы

        <button onClick={() => navigate("/register", { replace: true })}>
          регистрации
        </button>

        и

        <button onClick={() => navigate("/login", { replace: true })}>
          входа
        </button>
      </div>
      <Outlet />
    </Content>
  )
}