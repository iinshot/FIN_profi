import { Progress, ProgressDTO } from '@/constants'

export function progressAdapter(progress: ProgressDTO): Progress {
    return {
        progress: progress.last_checkpoint,
        articleId: progress.id_article,
        isRead: progress.is_read
    }
}