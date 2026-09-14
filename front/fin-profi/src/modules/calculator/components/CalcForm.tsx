import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AnimatePresence } from 'framer-motion'

import { Button } from '@/ui'

import { CalcResult, FormFields, OptionNames } from '../constants'
import { compoundInterest, formFieldsAdapter, getInputElement } from '../helpers'
import { simpleInterest } from '../helpers/simpleInterest'

type CalcFormProps = {
  selectedCalc: number,
  optionNames: OptionNames,
  setCalcResult: Dispatch<SetStateAction<CalcResult | null>>
}

export function CalcForm({ selectedCalc, optionNames, setCalcResult }: CalcFormProps) {
  const { register, watch, handleSubmit, setValue } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const adaptedData = formFieldsAdapter(data)

    setCalcResult(selectedCalc === 1 ? simpleInterest(adaptedData) : compoundInterest(adaptedData))
  }

  return (
    <form className="calculator-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="calculator-form-inputs">
        <div className="main-inputs">
          <AnimatePresence>
            {optionNames.main.map(name => getInputElement(name, register, watch))}
          </AnimatePresence>
        </div>

        <div className="side-inputs">
          <AnimatePresence>
            {optionNames.side.map(name => getInputElement(name, register, watch, setValue))}
          </AnimatePresence>
        </div>
      </div>

      <Button
        text="Рассчитать"
        type="submit"
        primary
      />
    </form>
  )
}
