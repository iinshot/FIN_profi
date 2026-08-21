import { motion, resize } from 'framer-motion'
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, useCallback, useState } from 'react'

type NodeWithHeaderProps = PropsWithChildren<{
  text: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

export function NodeWithHeader({ text, children, ...props }: NodeWithHeaderProps) {
  const [height, setHeight] = useState(0)

  const measureRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return
    return resize(el, (_, { height }) => setHeight(height))
  }, [])

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height }}
      exit={{ height: 0 }}
      style={{
        overflow: "hidden",
        willChange: "height"
      }}
    >
      <div
        ref={measureRef}
        {...props}
      >
        <h2>{text}</h2>
        {children}
      </div>
    </motion.div>
  )
}
