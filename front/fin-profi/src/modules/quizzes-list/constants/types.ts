type CurrentQuiz = {
    status: 'selected' | 'started' | 'completed',
    id: number,
    name?: string
}

export type { CurrentQuiz }