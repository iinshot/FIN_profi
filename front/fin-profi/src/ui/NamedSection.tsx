import clsx from 'clsx'
import { motion, MotionProps } from 'framer-motion'
import { PropsWithChildren, ReactNode, Ref } from 'react'

export type NamedSectionProps = PropsWithChildren<{
  text: string,
  icon?: ReactNode,
  className?: string,
  dark?: boolean,
  grayscale?: boolean,
  padding?: string,
  gap?: string,
  ref?: Ref<HTMLDivElement>,
  grow?: boolean,
  animation?: MotionProps
}>

export function NamedSection(props: NamedSectionProps) {
  const animation = props.animation ?? {}

  return (
    <motion.section
      className={
        clsx("named", {
          dark: props.dark,
          grayscale: props.grayscale,
          grow: props.grow
        }, props.className)
      }
      style={{
        padding: props.padding ?? "24px",
        gap: props.gap ?? "16px"
      }}
      {...animation}
    >
      <div className="header">
        <div className="icon">{props?.icon}</div>
        <span className="label">{props.text}</span>
      </div>

      <div className="content" ref={props.ref} >
        {props.children}
      </div>
    </motion.section>
  )
}