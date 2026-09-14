import { AUTH, QUESTION_TYPE, QUIZ_STATUS, STATUS } from "./names"

type Auth = typeof AUTH[keyof typeof AUTH]
type Status = typeof STATUS[keyof typeof STATUS]
type QuizStatus = typeof QUIZ_STATUS[keyof typeof QUIZ_STATUS]
type QuestionType = typeof QUESTION_TYPE[keyof typeof QUESTION_TYPE]

type Toast = {
    id: number,
    message: string,
    action: () => void
}

type ConfirmToast = {
    message: string | null,
    isOpen: boolean,
    resolver: ((value: boolean) => void) | null
}

type Payload = {
    sub: string,
    id_user: string
}

type UserDTO = {
    id_user: number,
    name: string,
    email: string,
    points: number,
    id_current_article: number | null
}

type User = { id: number } & Pick<UserDTO, 'name' | 'email' | 'points'>

type UserParams = {
    name?: string,
    email?: string,
    points?: number
}

type UsersArticles = {
    id_user: number,
    id_article: number,
    is_read: boolean,
    last_checkpoint: number,
    created_at: string
}

type ArticleDTO = {
    id_article: number,
    id_module: number,
    name: string,
    content: {
        data: []
    },
    id_quiz: number | null,
    users_articles: UsersArticles[]
}

type ProgressDTO = {
    id_user: number,
    id_article: number,
    is_read: boolean,
    last_checkpoint: number,
    created_at: string
}

type Progress = {
    progress: number,
    articleId: number,
    isRead: boolean
}

type ProgressParams = {
    last_checkpoint: number,
    is_read: boolean
}

type QuizzesQuestions = {
    id_question: number,
    id_quiz: number
}

type UsersQuizzes = {
    id_user: number,
    is_completed: boolean,
    id_quiz: number,
    created_at: string
}

type QuizDTO = {
    name: string,
    id_quiz: number,
    quizes_questions: QuizzesQuestions[],
    users_quizes: UsersQuizzes[]
}

type Answer = {
    id: number,
    text: string,
    isCorrect: boolean
}

type Question = {
    id: number,
    text: string,
    type: QuestionType,
    answers: Answer[]
}

type Quiz = {
    id: number,
    name: string,
    questions: ({ id: number } | Question)[],
    isCompleted?: boolean
}

type Article = {
    id: number,
    name: string,
    progress: number,
    isRead: boolean,
    moduleId: number,
    quizId: number | null
}

export type {
    Auth,
    Status,
    Toast,
    ConfirmToast,
    Payload,
    UserDTO,
    User,
    UserParams,
    ArticleDTO,
    ProgressDTO,
    Progress,
    ProgressParams,
    QuizStatus,
    QuizDTO,
    QuestionType,
    Question,
    Answer,
    Quiz,
    Article
}