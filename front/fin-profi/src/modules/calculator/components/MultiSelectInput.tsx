import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import clsx from 'clsx'

import { ArrowVertical } from '@/assets/icons'

import { FormFields, METHOD_RATE, MethodRateType } from '../constants'

export function MultiSelectInput({ register }: { register: UseFormRegister<FormFields> }) {
  const [list, setList] = useState([{
    value: METHOD_RATE.RELIABLE,
    text: "Надежный"
  }, {
    value: METHOD_RATE.MODERATE,
    text: "Умеренный"
  }, {
    value: METHOD_RATE.RISKY,
    text: "Рискованный"
  }])
  const [collapsed, setCollapsed] = useState(true)

  const onClickActive = () => setCollapsed(!collapsed)

  const onClickInactive = (method: { value: MethodRateType, text: string }) => {
    setList(prev => {
      const first = prev[0]
      prev = prev.slice(1)
      prev.push(first)

      prev = prev.filter(m => m.text !== method.text)
      prev.unshift(method)

      return prev
    })
    setCollapsed(true)
  }

  return (
    <div className={clsx("multiselect-input", { collapsed })}>
      {list.map((method, index) => (
        <label
          htmlFor={method.text}
          key={method.text}
        >
          <input
            type="radio"
            id={method.text}
            value={method.value}
            onClick={index === 0 ? onClickActive : () => onClickInactive(method)}
            defaultChecked={index === 0}
            {...register("investment-method")}
          />

          <div className="label">{method.text}</div>
        </label>
      ))}

      <ArrowVertical width={10} height={10} />
    </div>
  )
}
