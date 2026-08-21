type Article = {
    id: number,
    moduleId: number,
    name: string,
    content: Block[],
    quizId: number | null
}

type BlockType = "paragraph" | "header" | "warning"

type Block = {
    type: BlockType,
    text: string,
    order?: number
}

export type { Article, Block }