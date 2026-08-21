import { useState } from 'react'

import { ArticleSearch, ArticlesListSection } from '@/modules/articles-list'
import { ModuleSection, useModulesQueries } from '@/modules/main'
import { Content, SideBar } from '@/ui'

export default function Main() {
  const { data: modules, isLoading, isError } = useModulesQueries()

  const [searchText, setSearchText] = useState('')

  return (
    <>
      <Content>
        {modules.map(module => (
          <ModuleSection
            key={module.id}
            module={module}
            isLoading={isError || isLoading}
          />
        ))}
      </Content>

      <SideBar>
        <ArticleSearch
          text={searchText}
          setText={setSearchText}
        />

        <ArticlesListSection
          data={modules}
          searchText={searchText}
        />
      </SideBar>
    </>
  )
}
