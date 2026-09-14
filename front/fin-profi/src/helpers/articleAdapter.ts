import { ArticleDTO, Article } from '@/constants'

export function articleAdapter(article: ArticleDTO): Article {
    return {
        id: article.id_article,
        name: article.name,
        progress: 0,
        isRead: false,
        moduleId: article.id_module,
        quizId: article.id_quiz
    }
}