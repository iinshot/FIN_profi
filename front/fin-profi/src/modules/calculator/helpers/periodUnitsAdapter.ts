import { PERIOD, PeriodType } from '../constants'

function yearsAdapter(value: number) {
    if (value % 10 === 1) {
        if (value % 100 === 11) {
            return `${value} лет`
        }

        return `${value} год`
    }

    if (2 <= value % 10 && value % 10 <= 4) {
        if (12 <= value % 100 && value % 100 <= 14) {
            return `${value} лет`
        }

        return `${value} года`
    }

    return `${value} лет`
}

export function periodUnitsAdapter(units: PeriodType) {
    if (units === PERIOD.MONTHS) {
        return (value: number) => {
            if (value < 12) {
                return `${value} мес.`
            }

            const tail = value % 12 === 0 ? '' : ` ${value % 12} мес.`

            return yearsAdapter(Math.trunc(value / 12)) + tail
        }
    }

    return yearsAdapter
}