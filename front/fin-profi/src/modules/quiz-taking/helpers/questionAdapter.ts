import { Question } from "@/constants"

import { QuestionDTO } from '../constants'
import { answerAdapter } from './answerAdapter'

export function questionAdapter(question: QuestionDTO): Question {
    return {
        id: question.id_question,
        text: question.question_text,
        type: question.question_type,
        answers: question.answers.map(answerAdapter)
    }
}