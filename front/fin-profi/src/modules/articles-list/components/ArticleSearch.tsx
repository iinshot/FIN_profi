import { Dispatch, SetStateAction } from 'react'

import { Search } from '@/assets/icons'
import { Section } from '@/ui'

type ArticleSearchProps = {
  text: string,
  setText: Dispatch<SetStateAction<string>>
}

export function ArticleSearch({ text, setText }: ArticleSearchProps) {
  return (
    <Section
      padding="16px 24px"
      className="article-search"
    >
      <Search width={14} height={14} />

      <input
        className="body"
        name="article-search"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Поиск статей"
      />
    </Section>
  )
}
