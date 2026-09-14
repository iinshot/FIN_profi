import { useNavigate } from 'react-router'
import clsx from 'clsx'

import { ArrowLeft, ArrowRight } from '@/assets/icons'
import { ButtonGroup } from '@/components'
import { Button, Section } from '@/ui'
import { useHasNextArticle } from '@/modules/main'
import { useParamsId } from '@/hooks'

export function ArticleFooterSection() {
  const id = useParamsId("articleId")
  const hasNextArticle = useHasNextArticle(id)
  const navigate = useNavigate()

  return (
    <Section
      padding="40px 120px"
      className="article-footer"
    >
      <ButtonGroup>
        <Button
          left={<ArrowLeft width={9} height={9} />}
          text="Предыдущая статья"
          className={clsx({ disabled: id === 1 })}
          onClick={() => {
            if (id === 1) return
            navigate(`/articles/${id - 1}`)
          }}
        />

        <Button
          text="Следующая статья"
          right={<ArrowRight width={9} height={9} />}
          className={clsx({ disabled: !hasNextArticle })}
          onClick={() => {
            if (!hasNextArticle) return
            navigate(`/articles/${id + 1}`)
          }}
          primary
        />
      </ButtonGroup>
    </Section>
  )
}
