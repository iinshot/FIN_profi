import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { POINTS_PER_ARTICLE, Progress, STATUS, Status } from '@/constants'

type Synced<T> = T & { synced: boolean }

type Article = Synced<Progress & {
    updatedAt: number
}>

type State = {
    status: Status,
    hasHydrated: boolean,
    user: Synced<{
        points: number,
        currentArticleId: number | null
    }>,
    articles: Article[],
    count: number,
    progress: number
}

type Action = {
    setStatus: (status: Status) => void,
    setPoints: (points: number) => void,
    setSynced: ({
        articleId,
        user
    }: {
        articleId?: number,
        user?: boolean
    }) => void,
    setArticleProgress: ({ articleId, progress }: Omit<Progress, 'isRead'>) => void,
    getArticleProgress: (id: number) => Progress
    getNextProgress: () => (Article | undefined),
}

type ProgressStore = State & Action

export const useProgressStore = create<ProgressStore>()(persist((set, _, store) => ({
    status: "waiting",

    hasHydrated: false,

    user: {
        points: 0,
        currentArticleId: null,
        synced: false
    },

    articles: [],

    count: 1,

    progress: 0,

    setStatus: (status) => {
        if (status === STATUS.CLOSED) {
            setTimeout(() => set({
                ...store.getInitialState(),
                status
            }), 1000)
        }

        set(state => ({
            ...state,
            status
        }))
    },

    setPoints: (points) => {
        set(state => ({
            ...state,
            user: {
                ...state.user,
                points: state.user.points + points
            }
        }))
    },

    setSynced: ({ articleId, user }) => {
        if (user) {
            set(state => ({
                ...state,
                user: {
                    ...state.user,
                    synced: true
                }
            }))
        }

        if (articleId) {
            set(state => ({
                ...state,
                articles: state.articles.map(obj => {
                    if (obj.articleId === articleId) {
                        return {
                            ...obj,
                            synced: true,
                            updatedAt: Date.now()
                        }
                    }

                    return obj
                })
            }))
        }

        const res = store.getState().articles
            .filter(obj => obj.synced)

        set(state => ({
            ...state,
            progress: Math.trunc((res.length + (+store.getState().user.synced)) / store.getState().count * 100)
        }))
    },

    setArticleProgress: ({ articleId, progress }) => {
        const index = store.getState().articles
            .findIndex(obj => obj.articleId === articleId)
        let shouldSetPoints = false

        if (progress !== 100) {
            set(state => ({
                ...state,
                user: {
                    ...state.user,
                    currentArticleId: articleId
                }
            }))
        }

        if (index === -1) {
            const isRead = progress === 100

            set(state => ({
                ...state,
                articles: [...state.articles, {
                    articleId,
                    progress,
                    synced: false,
                    updatedAt: Date.now(),
                    isRead
                }],
                count: state.count + 1
            }))

            shouldSetPoints = isRead
        }
        else {
            set(state => ({
                ...state,
                articles: state.articles.map((obj, objIndex) => {
                    if (objIndex === index) {
                        if (!obj.isRead && progress === 100)
                            shouldSetPoints = true

                        return {
                            ...obj,
                            progress,
                            synced: false,
                            updatedAt: Date.now(),
                            isRead: obj.isRead || progress === 100
                        }
                    }
                    return obj
                })
            }))
        }

        if (shouldSetPoints) store.getState().setPoints(POINTS_PER_ARTICLE)
    },

    getArticleProgress: (id) => {
        const article = store.getState().articles
            .find(obj => obj.articleId === id)

        return (article ?
            {
                articleId: id,
                isRead: article.isRead,
                progress: article.progress
            } : {
                articleId: id,
                isRead: false,
                progress: 0
            }
        )
    },

    getNextProgress: () => {
        const res = store.getState().articles
            .sort((a, b) => a.updatedAt - b.updatedAt)
            .find(obj => !obj.synced)

        return res
    }
}), {
    name: "progressStore",

    partialize: (state) => ({
        user: state.user,
        articles: state.articles,
        count: state.count,
        progress: state.progress
    }),

    onRehydrateStorage: () => {
        return (restoredState, error) => {
            if (error || !restoredState) return

            restoredState.hasHydrated = true
        }
    }
}))