import { AnimatePresence } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { slugify } from 'transliteration'

import { useParamsId, useProgressQuery, useUserQuery } from '@/hooks'
import { ArticleFooterSection, ArticleSection, useArticleQuery, useDelayedScroll, placeholder } from '@/modules/article-viewing'
import { ContentsSection, useProgressState, useRefMap } from '@/modules/article-contents'
import { QuizSection } from '@/modules/quiz-taking'
import { Content, SideBar } from '@/ui'

export default function Article() {
  const containerRef = useRef<HTMLDivElement>(null)

  const id = useParamsId("articleId")
  const { data: article, isSuccess } = useArticleQuery(id)
  const { refMap, refCallback } = useRefMap()
  const { activeHeader } = useProgressState(containerRef, refMap)
  const { data, isSuccess: isProgressSuccess } = useProgressQuery(id)
  const { data: user } = useUserQuery()

  const contents = article?.content ?? placeholder

  const headers = useMemo(() => {
    return contents
      .filter(block => block.type === 'header')
      .map(block => ({
        order: block.order!,
        id: slugify(block.text),
        text: block.text
      }))
  }, [article])

  const count = headers.length
  const header = count === 0 ? 1 : Math.ceil((data?.progress ?? 1 / count * 100) * count / 100)

  useDelayedScroll(isSuccess && isProgressSuccess, refMap, header)

  return (
    <>
      <Content
        className="article-content"
        ref={containerRef}
      >
        <ArticleSection refCallback={refCallback} />

        <AnimatePresence>
          {article?.quizId && <QuizSection id={article.quizId} />}
        </AnimatePresence>

        <ArticleFooterSection />
      </Content>

      <SideBar>
        <ContentsSection
          headers={headers}
          refMap={refMap}
          activeHeader={activeHeader}
        />
      </SideBar>
    </>
  )
}
