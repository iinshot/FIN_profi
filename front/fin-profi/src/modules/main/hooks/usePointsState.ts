import { useLayoutEffect, useState } from 'react'

import { Article, Point } from '../constants'

export function usePointsState(cards: Map<number, HTMLDivElement>, articles: Article[] | undefined) {
    const [points, setPoints] = useState<Point[]>([])

    const resize = () => {
        if (!articles) return

        setPoints(articles
            .map(article => ({ id: article.id, card: cards.get(article.id) }))
            .filter(obj => obj.card !== undefined)
            .map((obj => {
                const card = obj.card!
                const w = card.clientWidth

                return {
                    x: card.offsetLeft + w / 2,
                    y: card.offsetTop + w / 2,
                    articleId: obj.id
                }
            }))
        )
    }

    useLayoutEffect(resize, [articles])

    const resizeObserver = new ResizeObserver(resize)

    return { points, resizeObserver }
}