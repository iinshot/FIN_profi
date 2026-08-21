import { Divider, Section } from '@/ui'

import { ModuleHeader } from './ModuleHeader'
import { ModuleBody } from './ModuleBody'
import { Module } from '../constants'
import '../style.scss'

type ModuleSectionProps = {
  isLoading: boolean,
  module?: Module
}

export function ModuleSection({ isLoading, module }: ModuleSectionProps) {
  return (
    <Section className="module" padding="28px 32px">
      <ModuleHeader
        isLoading={isLoading}
        module={module}
      />

      <Divider />

      <ModuleBody
        isLoading={isLoading}
        articles={module?.articles}
      />
    </Section>
  )
}
