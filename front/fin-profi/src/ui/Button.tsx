import { To, useNavigate } from 'react-router'
import clsx from 'clsx'
import { motion, MotionProps } from 'framer-motion'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  left?: ReactNode,
  text: string,
  right?: ReactNode,
  to?: To,
  replace?: boolean,
  primary?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  left,
  text,
  right,
  to,
  replace,
  primary,
  ...props
}: ButtonProps) {
  const navigate = useNavigate()
  const animation: MotionProps = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring" } },
    whileHover: { scale: 0.96 }
  }

  return (
    <motion.button
      className={clsx("button", { primary }, props.className)}
      onClick={(e) => {
        props.onClick && props.onClick(e)
        to && navigate(to, { replace })
      }}
      {...animation}
    >
      {left}
      <span>{text}</span>
      {right}
    </motion.button>
  )
}