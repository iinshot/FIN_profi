export function buildResult(rightCount: number, totalCount: number) {
    return [
        {
            value: rightCount,
            text: "правильных"
        },
        {
            value: totalCount - rightCount,
            text: "с ошибкой"
        },
        {
            value: `${Math.round(rightCount / totalCount * 100)}%`,
            text: "результат"
        }
    ]
}