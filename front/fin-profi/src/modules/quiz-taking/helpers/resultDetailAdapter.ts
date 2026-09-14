import { ResultDetail, ResultDetailDTO } from '../constants'
import { answerAdapter } from './answerAdapter'
import { questionAdapter } from './questionAdapter'

export function resultDetailAdapter(resultDelail: ResultDetailDTO): ResultDetail {
    return {
        correctAnswers: resultDelail.correct_answers?.map(answerAdapter) ?? [],
        givenAnswers: resultDelail.given_answers.map(answerAdapter),
        question: questionAdapter(resultDelail.question)
    }
}