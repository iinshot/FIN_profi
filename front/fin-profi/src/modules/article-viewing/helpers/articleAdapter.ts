import { ArticleDTO } from '@/constants'

import { Article } from '../constants'

export function articleAdapter(article: ArticleDTO): Article {
    return {
        id: article.id_article,
        moduleId: article.id_module,
        name: article.name,
        content: article.content.data,
        quizId: article.id_quiz
    }
}