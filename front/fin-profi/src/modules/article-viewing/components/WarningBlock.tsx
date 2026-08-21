import { PropsWithChildren } from 'react'

import { Exclam } from '@/assets/icons'

export function WarningBlock({ children }: PropsWithChildren<{}>) {
  return (
    <div className="warning-content-container">
      <div className="warning-content-svg-container">
        <Exclam width={11} height={11} />
      </div>

      <div className="warning-content">
        <h4>Обратите внимание</h4>

        <span className="body">{children}</span>
      </div>
    </div>
  )
}