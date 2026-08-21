import { useState } from 'react'

import { CalculationResults, Calculator } from '@/modules/calculator'
import type { CalcResult } from '@/modules/calculator'
import { Content, SideBar } from '@/ui'
import { CalcList } from '@/modules/calculators-list'

export default function Calculators() {
  const calcCount = 2

  const [selectedCalc, setSelectedCalc] = useState(1)
  const [calcResult, setCalcResult] = useState<CalcResult | null>(null)

  return (
    <>
      <Content>
        <Calculator
          selectedCalc={selectedCalc > calcCount ? 1 : selectedCalc}
          calcResult={calcResult}
          setCalcResult={setCalcResult}
        />

        {calcResult &&
          <CalculationResults
            result={calcResult}
          />
        }
      </Content>
      <SideBar>
        <CalcList
          selectedCalc={selectedCalc}
          setSelectedCalc={setSelectedCalc}
        />
      </SideBar>
    </>
  )
}
