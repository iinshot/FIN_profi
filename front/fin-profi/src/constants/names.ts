export const AUTH = {
    AUTHORIZED: "authorized",
    GUEST: "guest"
} as const

export const STATUS = {
    WAITING: "waiting",
    SYNCING: "syncing",
    CLOSED: "closed",
    ERROR: "error"
} as const

export const QUIZ_STATUS = {
    WAITING: "waiting",
    STARTING: "starting",
    STARTED: "started",
    COMPLETED: "completed",
    LOADING: "loading"
} as const

export const QUESTION_TYPE = {
    RADIO: "radio",
    CHECKBOX: "checkbox"
} as const

export const BASE_URL = "http://localhost/api"

export const POINTS_PER_ARTICLE = 200
export const POINTS_PER_QUIZ = 50

export const FETCH_USER_KEY = ["fetchUser"]
export const MUTATE_USER_KEY = ["updateUser"]
export const FETCH_PROGRESS_KEY = ["fetchProgress"]
export const POINTS_MUTATION_KEY = ["pointsMutation"]
export const FETCH_QUIZZES_KEY = ["fetchQuizzes"]
export const FETCH_ARTICLES_KEY = ["fetchArticles"]