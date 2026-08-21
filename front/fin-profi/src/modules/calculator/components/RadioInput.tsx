import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { FormFields, FormMainNames, FormSideNames } from '../constants'

type RadioInputProps = {
  text: string,
  register: UseFormRegister<FormFields>,
  name: FormMainNames | FormSideNames
} & InputHTMLAttributes<HTMLInputElement>

export function RadioInput({ text, register, ...props }: RadioInputProps) {
  return (
    <label htmlFor={props.id}>
      <input type="radio" {...register(props.name)} {...props} />

      <svg width={8} height={8}>
        <circle r={4} cx={4} cy={4} />
      </svg>

      <span className="label">{text}</span>
    </label>
  )
}
