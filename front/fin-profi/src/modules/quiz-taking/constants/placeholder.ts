import { Question } from './types'

export const placeholder: Question = {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    type: "checkbox",
    answers: [
        {
            id: 1,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            isCorrect: true,
        },
        {
            id: 2,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            isCorrect: false,
        },
        {
            id: 3,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            isCorrect: false,
        },
        {
            id: 4,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            isCorrect: false,
        }
    ]
}