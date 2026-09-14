import { CAPITALIZATION_PERIOD, METHOD_RATE, PERIOD } from './names'

type PeriodType = typeof PERIOD[keyof typeof PERIOD]
type CapitalizationPeriodType = typeof CAPITALIZATION_PERIOD[keyof typeof CAPITALIZATION_PERIOD]
type MethodRateType = typeof METHOD_RATE[keyof typeof METHOD_RATE]

type FormMainNames = "initial-amount" | "monthly-deposit" | "annual-rate" | "period" | "period-type"
type FormSideNames = "capitalization" | "investment-method" | "additional-settings" | "additional-settings.tax" | "additional-settings.inflation"

type OptionNames = {
    main: FormMainNames[]
    side: FormSideNames[]
}

type FormFields = {
    "initial-amount": string,
    "monthly-deposit": string,
    "annual-rate": number,
    period: number,
    "period-type": PeriodType,
    capitalization: CapitalizationPeriodType,
    "investment-method": MethodRateType,
    "additional-settings": {
        tax: string,
        inflation: string
    }
}

type DeepReplace<T, NewType> = {
    [K in keyof T]:
    T[K] extends object ?
    DeepReplace<T[K], NewType> :
    NewType
}

type FormFieldsNumeric = DeepReplace<FormFields, number>

type CalcResult = {
    totalAmount: string
    initialDeposit: string
    totalDeposited: string
    interestEarned: string
    capitalGrowthPercent: string
    periodText: string
}

export type { FormMainNames, FormSideNames, OptionNames, FormFields, PeriodType, CapitalizationPeriodType, MethodRateType, FormFieldsNumeric, CalcResult }