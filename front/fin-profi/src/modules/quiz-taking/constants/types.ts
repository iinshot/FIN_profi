import { Answer, Question, QuestionType, QuizDTO } from '@/constants'

type QuizResponseDTO = {
    quiz: QuizDTO
}

type AnswerDTO = {
    id_question: number,
    answer_text: string,
    id_answer: number,
    is_correct: boolean
}

type QuestionDTO = {
    id_question: number,
    question_text: string,
    question_type: QuestionType,
    answers: AnswerDTO[]
}

type ResultDetailDTO = {
    question: QuestionDTO,
    given_answers: AnswerDTO[],
    correct_answers?: AnswerDTO[]
}

type ResultDTO = {
    right: ResultDetailDTO[],
    wrong: ResultDetailDTO[]
}

type ResultDetail = {
    question: Question,
    givenAnswers: Answer[],
    correctAnswers?: Answer[]
}

type Result = {
    right: ResultDetail[],
    wrong: ResultDetail[]
}

export type {
    QuizResponseDTO,
    QuestionDTO,
    AnswerDTO,
    ResultDetailDTO,
    ResultDetail,
    ResultDTO,
    Result
}