import { useCallback, useState } from 'react'
import { resize } from 'framer-motion'

import { Section } from '@/ui'

import { CalcResult } from '../constants'
import ResultCard from './ResultCard'

type CalculationResultsProps = {
  result: CalcResult
}

export function CalculationResults({ result }: CalculationResultsProps) {
  const [height, setHeight] = useState<string | number>(0)

  const measureRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return
    return resize(el, (_, { height }) => setHeight(height))
  }, [])

  return (
    <Section
      padding="0 120px"
      className="calculation-results-wrapper"
      initial={{ height: 0 }}
      animate={{ height }}
    >
      <div
        className="calculation-results"
        ref={measureRef}
      >
        <h1>Результаты расчета</h1>
        <ResultCard {...result} />
      </div>
    </Section>
  )
}
