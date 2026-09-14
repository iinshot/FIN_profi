export function prettyNumber(digits: string) {
    return digits
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .replace('.', ',')
}