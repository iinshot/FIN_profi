import { useMotionValueEvent, useScroll } from 'framer-motion'
import { RefObject, useEffect, useRef, useState } from 'react'

import { useProgressStore, useUserStore } from '@/store'
import { FETCH_PROGRESS_KEY, POINTS_PER_ARTICLE, STATUS } from '@/constants'
import { useParamsId, usePointsMutation, useProgressQuery, useUserQuery } from '@/hooks'

import { useProgressMutation } from "."
import { queryClient } from '@/api'

export function useProgressState(
    containerRef: RefObject<HTMLDivElement | null>,
    refMap: RefObject<Map<number, HTMLDivElement>>
) {
    const [activeHeader, setActiveHeader] = useState<number>(1)
    const { scrollYProgress } = useScroll({ container: containerRef })
    const progress = useRef<number>(1)
    const prevLatest = useRef<number>(0)

    const articleId = useParamsId("articleId")

    const setArticleProgress = useProgressStore(state => state.setArticleProgress)
    const status = useProgressStore(state => state.status)

    const { mutate } = useProgressMutation()
    const { mutate: setPoints } = usePointsMutation()
    const { data: userData } = useUserQuery()
    const { data } = useProgressQuery(articleId)

    const count = refMap.current.size

    const getProgressPercent = () => Math.trunc(progress.current / count * 100)

    const hasScrolled = (direction: 'up' | 'down') => {
        const header = refMap.current.get(
            direction === 'down' ? activeHeader : activeHeader - 1
        )
        if (!header) return

        const { top } = header.getBoundingClientRect()

        return direction === 'down' ? top <= 120 : top > 120
    }

    useEffect(() => {
        if (count === 0) return

        if (status === STATUS.CLOSED) {
            if (!data || !userData) return

            const isRead = progress.current === count

            mutate({
                id: articleId,
                params: {
                    last_checkpoint: getProgressPercent(),
                    is_read: isRead
                }
            })

            if (isRead && !data.isRead) {
                setPoints({
                    id: userData.id,
                    params: {
                        points: userData.points + POINTS_PER_ARTICLE
                    }
                })
            }
        } else {
            setArticleProgress({
                articleId,
                progress: getProgressPercent()
            })
            queryClient.invalidateQueries({ queryKey: [...FETCH_PROGRESS_KEY, articleId] })
        }
    }, [status, articleId, progress.current, data, userData])

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < prevLatest.current) {
            if (latest === 0)
                setActiveHeader(1)
            else if (hasScrolled('up'))
                setActiveHeader(prev => prev - 1)

            prevLatest.current = latest

            return
        }

        if (latest === 1) {
            setActiveHeader(_ => {
                if (progress.current !== count)
                    progress.current = count
                return count
            })
        } else if (hasScrolled('down'))
            setActiveHeader(prev => {
                if (progress.current < prev + 1)
                    progress.current = prev + 1
                return prev + 1
            })

        prevLatest.current = latest
    })

    return { activeHeader }
}