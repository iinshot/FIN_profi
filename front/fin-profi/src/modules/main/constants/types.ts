import { Article } from '@/constants'

type UsersModulesDTO = {
    id_module: number,
    id_user: number
}

type ModuleDTO = {
    id_module: number,
    name: string,
    id_quiz: number | null,
    users_modules: UsersModulesDTO[]
}

type Module = {
    id: number,
    name: string,
    articles: Article[]
}

type Point = {
    x: number,
    y: number,
    articleId: number
}

export type { ModuleDTO, Module, Point }