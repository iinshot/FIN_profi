import { POINTS_PER_ARTICLE, POINTS_PER_QUIZ } from "@/constants"

import { Statistics, Template } from "../constants"

export function buildTemplate(data: Statistics): Template {
    return {
        total: [
            {
                text: "Всего очков",
                value: data.articles.progress * POINTS_PER_ARTICLE + data.quizzes.progress * POINTS_PER_QUIZ
            }
        ],
        articles: [
            {
                text: "Прочитано статей",
                value: data.articles.progress
            },
            {
                text: "Осталось статей",
                value: data.articles.count - data.articles.progress
            },
            {
                text: "Получено очков",
                value: data.articles.progress * POINTS_PER_ARTICLE
            }
        ],
        quizzes: [
            {
                text: "Пройдено викторин",
                value: data.quizzes.progress
            },
            {
                text: "Осталось викторин",
                value: data.quizzes.count - data.quizzes.progress
            },
            {
                text: "Получено очков",
                value: data.quizzes.progress * POINTS_PER_QUIZ
            }
        ]
    }
}