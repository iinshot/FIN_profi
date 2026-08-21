type Entities = 'articles' | 'quizzes'

type TemplateDetails = {
    text: string,
    value: number
}[]

type Template = Record<Entities | 'total', TemplateDetails>

type StatisticsDetailsDTO = {
    user_progress: number,
    all_count: number
}

type StatisticsDTO = Record<Entities, StatisticsDetailsDTO>

type StatisticsDetails = {
    progress: number,
    count: number
}

type Statistics = Record<Entities, StatisticsDetails>

export type { TemplateDetails, Template, StatisticsDTO, Statistics }