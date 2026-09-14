import { InvestRound } from '@/modules/calculator/components/InvestRound'
import { motion } from 'framer-motion'

type CalcCardProps = {
  name: string,
  onClick: () => void,
  calc: number,
  selectedCalc: number
}

export function CalcCard({ name, onClick, selectedCalc, calc }: CalcCardProps) {
  return (
    <motion.div
      className="calc-list-card"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + 0.1 * calc }}
    >
      <InvestRound type={selectedCalc === calc ? "active" : "inactive"} />

      <h4>{name}</h4>
    </motion.div>
  )
}
