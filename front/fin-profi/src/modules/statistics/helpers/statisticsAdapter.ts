import { Statistics, StatisticsDTO } from '../constants/types'

export function statisticsAdapter(statistics: StatisticsDTO): Statistics {
    return {
        articles: {
            count: statistics.articles.all_count,
            progress: statistics.articles.user_progress
        },
        quizzes: {
            count: statistics.quizzes.all_count,
            progress: statistics.quizzes.user_progress
        }
    }
}