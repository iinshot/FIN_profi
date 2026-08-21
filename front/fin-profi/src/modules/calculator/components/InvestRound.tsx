import clsx from 'clsx'

import { Invest } from '@/assets/icons'

type InvestRoundProps = {
  type: 'active' | 'inactive' | 'primary'
}

export function InvestRound({ type }: InvestRoundProps) {
  const size = type === 'inactive' ? {
    width: 11,
    height: 11
  } : {
    width: 14,
    height: 14
  }

  return (
    <div className={clsx("calculator-icon", type)}>
      <Invest {...size} />
    </div>
  )
}
