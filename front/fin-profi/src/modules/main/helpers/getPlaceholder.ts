import { Module } from '../constants'

export function getPlaceholder(): Module[] {
    return [{
        id: 1,
        name: "_",
        articles: [
            {
                id: 1,
                name: "_",
                progress: 0,
                moduleId: 1,
                isRead: false
            },
            {
                id: 2,
                name: "_",
                progress: 0,
                moduleId: 1,
                isRead: false
            },
            {
                id: 3,
                name: "_",
                progress: 0,
                moduleId: 1,
                isRead: false
            }
        ]
    }]
}