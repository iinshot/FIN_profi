import { CalcResult, FormFieldsNumeric, PERIOD } from '../constants'
import { periodUnitsAdapter } from './periodUnitsAdapter'

export function simpleInterest({
    "additional-settings": {
        inflation,
        tax
    },
    "annual-rate": annualRate,
    "initial-amount": initialAmount,
    "period-type": periodType,
    period
}: FormFieldsNumeric): CalcResult {
    const totalMonths = period * periodType
    let interestEarned = initialAmount * (annualRate / 100) * (totalMonths / 12)

    const totalDeposited = initialAmount
    let balance = totalDeposited + interestEarned

    if (tax) {
        const taxAmount = (interestEarned * tax) / 100
        interestEarned -= taxAmount
        balance -= taxAmount
    }

    if (inflation) {
        const inflationFactor = Math.pow(1 + inflation / 100, totalMonths / 12)
        balance /= inflationFactor
        interestEarned = balance - totalDeposited
    }

    const capitalGrowthPercent = totalDeposited > 0 ? ((balance - totalDeposited) / totalDeposited) * 100 : 0

    return {
        totalAmount: balance.toFixed(2),
        initialDeposit: initialAmount.toFixed(2),
        totalDeposited: totalDeposited.toFixed(2),
        interestEarned: interestEarned.toFixed(2),
        capitalGrowthPercent: capitalGrowthPercent.toFixed(2),
        periodText: periodUnitsAdapter(PERIOD.MONTHS)(totalMonths)
    }
}