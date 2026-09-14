import { ReactNode } from "react"

type ButtonGroupProps = {
  children: ReactNode
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div className='button-group'>
      {children}
    </div>
  )
}