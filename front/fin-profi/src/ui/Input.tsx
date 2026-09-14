import { Hide, Show } from '@/assets/icons'
import { COLORS } from '@/constants'
import { motion, MotionProps } from 'framer-motion'
import { InputHTMLAttributes, ReactElement, SVGProps, useState } from 'react'

type InputProps = {
  icon: ReactElement,
  text: string,
  delay?: number
} & InputHTMLAttributes<HTMLInputElement>

export function Input({ icon, text, delay, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(props.type !== "password")

  const eyeProps: SVGProps<SVGSVGElement> = {
    width: 18,
    height: 18,
    fill: COLORS.MID_GRAY,
    onMouseDown: () => setShowPassword(true),
    onMouseUp: () => setShowPassword(false)
  }

  const animation: MotionProps = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, animationDuration: 0.2, transition: { type: "spring", delay: delay ?? 0 } },
  }

  return (
    <div className="input">
      <label
        className="label"
        htmlFor={props.id}
      >
        {text}
      </label>

      <motion.div
        className="input-container"
        layout={false}
        {...animation}
      >
        {icon}
        <input {...props} type={showPassword ? "text" : "password"} />
        {props.type === "password" && (
          showPassword ?
            <Show {...eyeProps} /> : <Hide {...eyeProps} />
        )}
      </motion.div>
    </div>
  )
}