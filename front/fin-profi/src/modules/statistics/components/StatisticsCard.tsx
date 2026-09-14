import { Divider, NamedSection, ProgressCircle, Skeleton, type NamedSectionProps } from '@/ui'

import { TemplateDetails } from '../constants/types'

type Props = {
  progress: number,
  value: number,
  template: TemplateDetails,
  sectionProps: NamedSectionProps,
  showSkeleton: boolean
}

export function StatisticsCard({ progress, value, template, sectionProps, showSkeleton }: Props) {
  return (
    <NamedSection
      padding="24px"
      gap="12px"
      {...sectionProps}
    >
      <div className="progress">
        <ProgressCircle
          text={value}
          value={progress}
          style={{
            marginBottom: "10px"
          }}
          large={sectionProps.dark}
        />
      </div>

      <Divider />

      {template.map((templateObj, index) => (
        <div key={index} className="row">
          <span className={sectionProps.dark ? "h3" : "body"}>{templateObj.text}</span>

          <Skeleton height={sectionProps.dark ? 25 : 23} width={50} show={showSkeleton} dark={sectionProps.dark}>
            <span className={sectionProps.dark ? "h3" : "body"}>{templateObj.value}</span>
          </Skeleton>
        </div>
      ))}
    </NamedSection>
  )
}