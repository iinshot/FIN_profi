export function getStatus(someIsRead: boolean, maxProgress: number, isCompleted: boolean) {
    if (isCompleted) {
        return {
            status: "completed",
            text: "Пройден"
        }
    } else if (maxProgress !== 0 || someIsRead) {
        return {
            status: "active",
            text: "В процессе"
        }
    }

    return {
        status: "inactive",
        text: "Не начат"
    }
}