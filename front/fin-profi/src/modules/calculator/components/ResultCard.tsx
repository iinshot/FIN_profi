import { motion, MotionProps } from 'framer-motion'

import { Cup } from '@/assets/icons'

import { CalcResult } from '../constants'
import { prettyNumber } from '../helpers'

export default function ResultCard({ periodText, totalAmount, capitalGrowthPercent, initialDeposit, interestEarned, totalDeposited }: CalcResult) {
  const cardEntryAnimation: MotionProps = {
    initial: {
      x: -10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    transition: {
      ease: 'easeIn'
    }
  }

  return (
    <div className="calculation-results-card">
      <motion.div
        className="calculation-results-card-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="calculation-results-card-main-group">
          <div className="cup-icon">
            <Cup width={20} height={20} />
          </div>

          <h2>Итог через {periodText}</h2>
        </div>

        <div className="digits">{prettyNumber(totalAmount)} ₽</div>
      </motion.div>

      <motion.div
        className="calculation-results-card-entry"
        {...cardEntryAnimation}
        transition={{ delay: 0.1 }}
      >
        <span className="body">Начальная сумма</span>
        <span className="body">{prettyNumber(initialDeposit)} ₽</span>
      </motion.div>

      <motion.div
        className="calculation-results-card-entry"
        {...cardEntryAnimation}
        transition={{ delay: 0.2 }}
      >
        <span className="body">Всего инвестировано</span>
        <span className="body">{prettyNumber(totalDeposited)} ₽</span>
      </motion.div>

      <motion.div
        className="calculation-results-card-entry"
        {...cardEntryAnimation}
        transition={{ delay: 0.3 }}
      >
        <span className="body">Начислено процентов</span>
        <span className="body">{prettyNumber(interestEarned)} ₽</span>
      </motion.div>

      <motion.div
        className="calculation-results-card-entry"
        {...cardEntryAnimation}
        transition={{ delay: 0.4 }}
      >
        <span className="body">Прирост капитала</span>
        <span className="body">
          {Number(capitalGrowthPercent) > 0 ? "+" : null}{prettyNumber(capitalGrowthPercent)}%
        </span>
      </motion.div>
    </div>
  )
}
