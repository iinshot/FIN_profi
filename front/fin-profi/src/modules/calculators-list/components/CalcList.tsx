import { NamedSection } from '@/ui'

import { Dispatch, SetStateAction } from 'react'
import { CalcCard } from './CalcCard'
import '../style.scss'

type CalcListProps = {
  selectedCalc: number,
  setSelectedCalc: Dispatch<SetStateAction<number>>
}

export function CalcList({ selectedCalc, setSelectedCalc }: CalcListProps) {
  return (
    <NamedSection
      text="Выберите калькулятор"
      className="calc-list"
      grow
    >
      <CalcCard
        calc={1}
        name="Калькулятор простого процента"
        onClick={() => setSelectedCalc(1)}
        selectedCalc={selectedCalc}
      />

      <CalcCard
        calc={2}
        name="Калькулятор сложного процента"
        onClick={() => setSelectedCalc(2)}
        selectedCalc={selectedCalc}
      />
    </NamedSection>
  )
}
