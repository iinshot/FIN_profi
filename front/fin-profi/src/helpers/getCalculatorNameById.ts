export function getCalculatorNameById(id: number) {
    const names = {
        1: "Калькулятор простого процента",
        2: "Калькулятор сложного процента"
    }

    return names[id]
}