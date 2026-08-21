import { useQuery } from '@tanstack/react-query'

import { AUTH, FETCH_PROGRESS_KEY, STATUS } from '@/constants'
import { useProgressStore, useUserStore } from '@/store'
import { fetchProgress } from '@/api'
import { useParamsId } from './useParamsId'

export function useProgressQuery(id?: number) {
    const fallbackId = useParamsId("articleId")
    const status = useProgressStore(state => state.status)
    const auth = useUserStore(state => state.auth)
    const getArticleProgress = useProgressStore(state => state.getArticleProgress)

    if (!id) id = fallbackId

    const queryResp = useQuery({
        queryKey: [...FETCH_PROGRESS_KEY, id],
        queryFn: () => fetchProgress(id),
        enabled: status === STATUS.CLOSED
    })

    if (auth === AUTH.AUTHORIZED && status !== STATUS.SYNCING) {
        return queryResp
    }

    return {
        data: getArticleProgress(id),
        isSuccess: true
    }
}