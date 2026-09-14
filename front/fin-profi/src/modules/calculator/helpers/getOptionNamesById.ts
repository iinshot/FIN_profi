import { FormMainNames, FormSideNames, OptionNames } from '../constants'

export function getOptionNamesById(id: number): OptionNames {
    const main: FormMainNames[] = ["initial-amount", "monthly-deposit", "annual-rate", "period"] as const
    const side: FormSideNames[] = ["capitalization", "additional-settings", "investment-method"] as const

    if (id === 2) return { main, side }

    return {
        main: main.filter(name => name !== "monthly-deposit"),
        side: side.filter(name => name === "additional-settings")
    }
}