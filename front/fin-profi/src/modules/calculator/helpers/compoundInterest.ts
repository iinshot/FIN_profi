import { CalcResult, FormFieldsNumeric, PERIOD } from '../constants'
import { periodUnitsAdapter } from './periodUnitsAdapter'

export function compoundInterest({
    "additional-settings": {
        inflation,
        tax
    },
    "annual-rate": annualRate,
    "initial-amount": initialAmount,
    "investment-method": investmentMethod,
    "monthly-deposit": monthlyDeposit,
    "period-type": periodType,
    capitalization: periodsPerYear,
    period
}: FormFieldsNumeric): CalcResult {
    const adjustedRate = annualRate * investmentMethod / 100
    const totalMonths = period * periodType
    const ratePerPeriod = adjustedRate / periodsPerYear
    const monthsPerPeriod = 12 / periodsPerYear

    let balance = initialAmount
    let totalMonthsPassed = 0

    while (totalMonthsPassed < totalMonths) {
        const monthsInThisPeriod = Math.min(monthsPerPeriod, totalMonths - totalMonthsPassed)

        balance += monthlyDeposit * monthsInThisPeriod
        totalMonthsPassed += monthsInThisPeriod

        if (monthsInThisPeriod == monthsPerPeriod)
            balance *= (1 + ratePerPeriod)
    }

    const totalDeposited = initialAmount + monthlyDeposit * totalMonths
    let interestEarned = balance - totalDeposited

    if (tax) {
        const taxAmount = interestEarned * tax / 100
        interestEarned -= taxAmount
        balance -= taxAmount
    }

    if (inflation) {
        const inflationFactor = Math.pow((1 + inflation / 100), totalMonths / 12)
        balance /= inflationFactor
        interestEarned = balance - totalDeposited
    }

    const capitalGrowthPercent = totalDeposited > 0 ? (balance - totalDeposited) / totalDeposited * 100 : 0

    return {
        totalAmount: balance.toFixed(2),
        initialDeposit: initialAmount.toFixed(2),
        totalDeposited: totalDeposited.toFixed(2),
        interestEarned: interestEarned.toFixed(2),
        capitalGrowthPercent: capitalGrowthPercent.toFixed(2),
        periodText: periodUnitsAdapter(PERIOD.MONTHS)(totalMonths)
    }
}