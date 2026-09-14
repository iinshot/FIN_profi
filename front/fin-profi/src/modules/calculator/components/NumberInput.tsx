import { InputHTMLAttributes, useCallback, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { motion, resize } from 'framer-motion'
import clsx from 'clsx'

import { FormFields, FormMainNames, FormSideNames } from '../constants'
import { prettyNumber } from '../helpers'

type NumberInputProps = {
  blockSize: 'small' | 'large',
  text: string,
  register: UseFormRegister<FormFields>,
  name: FormMainNames | FormSideNames
} & InputHTMLAttributes<HTMLInputElement>

export function NumberInput({ blockSize, text, register, name, ...props }: NumberInputProps) {
  const { onChange, ...registerProps } = register(name)
  const [height, setHeight] = useState(0)

  const measureRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return
    return resize(el, (_, { height }) => setHeight(height))
  }, [])

  return (
    <motion.div
      style={{
        overflow: "hidden",
        willChange: "height"
      }}
      initial={{ height: 0 }}
      animate={{ height }}
      exit={{ height: 0 }}
    >
      <div
        className={clsx("number-input", blockSize, name)}
        style={{ paddingBottom: blockSize === "large" ? 30 : 0 }}
        ref={measureRef}
      >
        <label htmlFor={name}>
          <div className={blockSize === "large" ? "h2" : "h3"}>{text}</div>
        </label>

        <div className={"input-wrapper"}>
          <input
            className={blockSize === "large" ? "digits" : "card-header"}
            id={name}
            autoComplete='off'
            type="text"
            inputMode="numeric"
            {...props}
            onChange={(e) => {
              let rawValue = e.target.value.replace(/[^\d,]/g, "")

              if (rawValue === "") {
                e.target.value = ""
                onChange(e)
                return
              }

              const parts = rawValue.split(",")
              let integerPart = parts[0]
              const hasComma = parts.length > 1

              let decimalPart = hasComma ? parts.slice(1).join("") : ""

              const size = blockSize === "large" ? 12 : 2

              if (integerPart.length > size) {
                integerPart = integerPart.slice(0, size)
              }

              if (decimalPart.length > 2) {
                decimalPart = decimalPart.slice(0, 2)
              }

              let finalValue = prettyNumber(integerPart)

              if (hasComma) {
                finalValue += `,${decimalPart}`
              }

              e.target.value = finalValue

              onChange(e)
            }}
            {...registerProps}
          />
        </div>
      </div>
    </motion.div>
  )
}
