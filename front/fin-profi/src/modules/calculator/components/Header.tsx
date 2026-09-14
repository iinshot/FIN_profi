import { InvestRound } from './InvestRound'

type HeaderProps = {
  name: string
}

export function Header({ name }: HeaderProps) {
  return (
    <div
      className="calculator-header"
    >
      <InvestRound type="primary" />

      <h1>{name}</h1>
    </div>
  )
}
