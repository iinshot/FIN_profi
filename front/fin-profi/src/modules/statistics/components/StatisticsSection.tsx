import { Article, CheckCircle, Energy } from '@/assets/icons'
import { Section } from '@/ui'
import { useErrorEffect } from '@/hooks'

import { StatisticsCard } from './StatisticsCard'
import { buildTemplate, getPlaceholder } from '../helpers'
import { useStatisticsQuery } from '../hooks'
import '../style.scss'

export function StatisticsSection() {
  const {
    data: statistics = getPlaceholder(),
    error,
    isError,
    isLoading
  } = useStatisticsQuery()

  const { articles, quizzes } = statistics!
  const template = buildTemplate(statistics!)

  useErrorEffect(error)

  return (
    <Section
      padding="0"
      className="statistics"
    >
      <StatisticsCard
        sectionProps={{
          text: "Общий прогресс",
          icon: <Energy height={10} width={10} />,
          dark: true
        }}
        progress={(articles.progress + quizzes.progress) / (articles.count + quizzes.count) * 100}
        value={articles.progress + quizzes.progress}
        template={template.total}
        showSkeleton={isLoading || isError}
      />

      <StatisticsCard
        sectionProps={{
          text: "Статьи",
          icon: <Article height={10} width={10} />
        }}
        progress={articles.progress / articles.count * 100}
        value={articles.progress}
        template={template.articles}
        showSkeleton={isLoading || isError}
      />

      <StatisticsCard
        sectionProps={{
          text: "Викторины",
          icon: <CheckCircle height={10} width={10} />
        }}
        progress={quizzes.progress / quizzes.count * 100}
        value={quizzes.progress}
        template={template.quizzes}
        showSkeleton={isLoading || isError}
      />
    </Section>
  )
}
