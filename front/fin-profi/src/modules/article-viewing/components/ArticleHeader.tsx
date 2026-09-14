import { useNavigate } from 'react-router'

import { ArrowLeft } from '@/assets/icons'
import { Button, Skeleton } from '@/ui'
import { useErrorEffect, useParamsId } from '@/hooks'

import { useArticleQuery } from '../hooks'

export function ArticleHeader() {
  const id = useParamsId("articleId")
  const { data, error, isLoading, isError } = useArticleQuery(id)
  const navigate = useNavigate()

  useErrorEffect(error)

  return (
    <div className="article-header">
      <Button
        left={<ArrowLeft />}
        text="Назад"
        onClick={() => navigate(`/`)}
        primary
      />

      <Skeleton
        width={200}
        height={38}
        show={isLoading || isError}
      >
        <h1>{data?.name ?? ""}</h1>
      </Skeleton>
    </div>
  )
}