import { POINTS_PER_QUIZ, Quiz } from '@/constants'
import { Statistics } from '../constants'

export function extractStatistics(quizzes: Quiz[]): {
    count: number
    statistics: Statistics[]
} {
    const count = quizzes.length
    const completedCount = quizzes
        .filter(quiz => quiz.isCompleted)
        .length

    return {
        count,
        statistics: [
            {
                value: completedCount * POINTS_PER_QUIZ,
                text: "очков"
            },
            {
                value: completedCount,
                text: "пройдено"
            },
            {
                value: count - completedCount,
                text: "осталось"
            }
        ]
    }
}