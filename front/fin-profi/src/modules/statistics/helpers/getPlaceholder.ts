import { Statistics } from '../constants/types'

export function getPlaceholder(): Statistics {
    return {
        articles: {
            count: 1,
            progress: 0
        },
        quizzes: {
            count: 1,
            progress: 0
        }
    }
}