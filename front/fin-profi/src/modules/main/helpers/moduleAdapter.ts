import { Article, Module, ModuleDTO } from '../constants'

type ModuleAdapter = {
    (module: ModuleDTO): Module
    (module: Module, articles: Article[]): Module
}

const isModule = (obj: any): obj is Module => {
    return (
        obj &&
        typeof obj === "object" &&
        ["id", "name", "articles"].every(field => field in obj)
    )
}

export const moduleAdapter: ModuleAdapter = (module: Module | ModuleDTO, articles?: Article[]): Module => {
    if (isModule(module)) {
        return {
            ...module,
            articles: articles!.sort((a, b) => a.id - b.id)
        }
    }

    return {
        id: module.id_module,
        name: module.name,
        articles: []
    }
}