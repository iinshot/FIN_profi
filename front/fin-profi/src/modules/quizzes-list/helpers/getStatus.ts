export function getStatus(inProgress: boolean, isCompleted: boolean) {
    if (inProgress)
        return "В процессе"

    if (isCompleted)
        return "Пройдено"

    return "Не пройдено"
}