import clsx from 'clsx'
import { motion, MotionProps } from 'framer-motion'
import { CSSProperties, PropsWithChildren } from 'react'

type SkeletonProps = PropsWithChildren<{
  show: boolean,
  width?: number | string,
  height: number | string,
  dark?: boolean,
  className?: string
}>

export function Skeleton({ show, width, height, children, dark = false, className }: SkeletonProps) {
  let styles: CSSProperties = {
    width: width ?? "100%",
    height
  }

  if (width === height) styles = { ...styles, borderRadius: "50%" }

  return show ?
    <div
      className={clsx(className, "skeleton", { dark })}
      style={styles}
    ></div>
    : children
}