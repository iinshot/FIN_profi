import { Answer } from "@/constants"

import { AnswerDTO } from '../constants'

export function answerAdapter(answer: AnswerDTO): Answer {
    return {
        id: answer.id_answer,
        isCorrect: answer.is_correct,
        text: answer.answer_text
    }
}