import { CSSProperties, ReactNode } from 'react'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import { FormFields } from '../constants'

type RangeInputProps = {
  from: number,
  text: string,
  to: number,
  id: "annual-rate" | "period",
  children?: ReactNode,
  register: UseFormRegister<FormFields>,
  watch: UseFormWatch<FormFields>,
  units: string | ((value: number) => string)
}

export function RangeInput({ from, text, to, id, children, register, watch, units }: RangeInputProps) {
  const value = watch(id)

  const percent = ((value - from) / (to - from)) * 100

  return (
    <div
      className={id}
      style={{ paddingBottom: id === "annual-rate" ? 30 : 0 }}
    >
      <div className={`${id}-header`}>
        <div className={`${id}-label-group`}>
          <label
            htmlFor={id}
            className="h2"
          >{text}</label>

          {children}
        </div>

        <span className="small">{typeof units === "string" ? value + units : units(value)}</span>
      </div>

      <div className="range-input">
        <input
          type="range"
          id={id}
          min={from}
          max={to}
          style={{ '--value': `${percent}%` } as CSSProperties}
          {...register(id)}
        />

        <div className="edges">
          <span className="small">{typeof units === "string" ? from + units : units(from)}</span>

          <span className="small">{typeof units === "string" ? to + units : units(to)}</span>
        </div>
      </div>
    </div>
  )
}
