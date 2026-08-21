import { Section } from '@/ui'
import { useParamsId } from '@/hooks'
import { RefCallback } from 'react'

import { ArticleHeader } from './ArticleHeader'
import { Block } from './Block'
import { useArticleQuery } from '../hooks'
import { placeholder } from '../constants'
import "../style.scss"

type ArticleSectionProps = {
  refCallback: (order?: number) => RefCallback<HTMLDivElement> | undefined
}

export function ArticleSection({ refCallback }: ArticleSectionProps) {
  const id = useParamsId("articleId")
  const { data, isLoading, isError } = useArticleQuery(id)
  const contents = data?.content ?? placeholder

  return (
    <Section
      className="article"
      padding="0 120px 28px 120px"
      grow
    >
      <ArticleHeader />

      <div className="article-content" >
        {contents.map((block, index) => {
          return (
            <Block
              isLoading={isError || isLoading}
              key={index}
              ref={refCallback(block.order)}
              {...block}
            />
          )
        })}
      </div>
    </Section>
  )
}