import { Activity, ActivityDTO } from '../constants'

export function activityAdapter(activity: ActivityDTO): Activity {
    const date = new Date(activity.created_at)
    date.setHours(0, 0, 0, 0)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const daysAgo = Math.round((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    return {
        type: activity.type,
        name: activity.name,
        daysAgo
    }
}