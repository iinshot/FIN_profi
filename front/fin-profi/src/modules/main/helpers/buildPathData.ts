import { Point } from '../constants'

export function buildPathData(upPoint: Point, downPoint: Point, depth: number) {
    let result = [`M ${upPoint.x} ${upPoint.y}`]

    const p1: Point = { x: upPoint.x, y: downPoint.y, articleId: 0 }
    const p2: Point = { x: downPoint.x, y: upPoint.y, articleId: 0 }

    const dx = p2.x - p1.x
    const dy = p2.y - p1.y

    result.push(`C ${p1.x + dx * depth} ${p1.y + dy * depth}`)
    result.push(`${p2.x - dx * depth} ${p2.y - dy * depth}`)
    result.push(`${downPoint.x} ${downPoint.y}`)

    return result.join(" ")
}