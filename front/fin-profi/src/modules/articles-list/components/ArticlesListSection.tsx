import { type Module } from '@/modules/main'
import { NamedSection } from '@/ui'

import { ModuleNode } from './ModuleNode'
import '../style.scss'


type ArticlesListSectionProps = {
  data: Module[],
  searchText: string
}

export function ArticlesListSection({ data, searchText }: ArticlesListSectionProps) {
  return (
    <NamedSection
      text="Список статей"
      padding="16px 24px"
      className="articles-list"
      grow
    >
      {data.map((module, index) => {
        return (
          <ModuleNode
            data={module}
            key={module.id}
            searchText={searchText.toLowerCase()}
            prevArticlesCount={data.at(index - 1)?.articles.length ?? 0}
          />
        )
      })}
    </NamedSection>
  )
}