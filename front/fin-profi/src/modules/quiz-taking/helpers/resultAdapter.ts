import { Result, ResultDTO } from '../constants'
import { resultDetailAdapter } from './resultDetailAdapter'

export function resultAdapter(result: ResultDTO): Result {
    return {
        wrong: result.wrong.map(resultDetailAdapter),
        right: result.right.map(resultDetailAdapter)
    }
}