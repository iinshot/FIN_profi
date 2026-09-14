import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { Section } from '@/ui'
import { getCalculatorNameById } from '@/helpers'

import { getOptionNamesById } from '../helpers'
import { CalcResult } from '../constants'
import { Header } from './Header'
import { CalcForm } from './CalcForm'
import "../style.scss"
import { resize } from 'framer-motion'

type CalculatorProps = {
  selectedCalc: number,
  calcResult: CalcResult | null,
  setCalcResult: Dispatch<SetStateAction<CalcResult | null>>
}

export function Calculator({ selectedCalc, calcResult, setCalcResult }: CalculatorProps) {
  return (
    <Section
      padding="28px 120px"
      className="calculator"
      grow={!calcResult}
    >
      <Header
        name={getCalculatorNameById(selectedCalc)}
      />

      <CalcForm
        optionNames={getOptionNamesById(selectedCalc)}
        selectedCalc={selectedCalc}
        setCalcResult={setCalcResult}
      />
    </Section>
  )
}
