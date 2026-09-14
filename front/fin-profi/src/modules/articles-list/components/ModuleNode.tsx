import { Module } from '@/modules/main'
import clsx from 'clsx'
import { ArticleListNode } from './ArticleListNode'
import { motion, MotionProps } from 'framer-motion'

type ModuleNodeProps = {
  data: Module,
  searchText: string,
  prevArticlesCount: number
}

export function ModuleNode({ data, searchText, prevArticlesCount }: ModuleNodeProps) {
  const active = data.articles
    .some(article => article.isRead || article.progress > 0)

  const articles = data.articles
    .filter(article => article.name
      .toLowerCase()
      .includes(searchText)
    )

  if (articles.length === 0) return null

  const animation: MotionProps = {
    initial: {
      opacity: 0,
      scale: 0.9
    },

    animate: {
      opacity: 1,
      scale: 1
    },

    transition: { delay: Math.min(prevArticlesCount + data.id, 10) * 0.1 }
  }

  return (
    <div className={clsx("module-node", { active })}>
      <motion.h4
        {...animation}
        className="title"
      >Модуль {data.id} — {data.name}</motion.h4>

      {articles.map(article => (
        <ArticleListNode
          key={article.id}
          data={article}
        />
      ))}
    </div>
  )
}