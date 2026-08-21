import { FormFields, FormFieldsNumeric } from '../constants'

export function formFieldsAdapter(formFields: FormFields): FormFieldsNumeric {
    const parseNode = (node: string | object) => {
        if (typeof node === 'object') {
            return Object.fromEntries(
                Object.entries(node).map(([key, value]) => [key, parseNode(value)])
            )
        }

        return Number(String(node)
            .replace(/\s/g, '')
            .replace(',', '.')
        )
    }

    return parseNode(formFields) as FormFieldsNumeric
}