import clsx from 'clsx'

import type { Block } from '../constants'
import { WarningBlock } from './WarningBlock'
import { HeaderBlock } from './HeaderBlock'
import { MultilineSkeleton, Skeleton } from '@/ui'
import { slugify } from 'transliteration'
import { RefCallback } from 'react'

type Props = {
  isLoading: boolean,
  ref: RefCallback<HTMLDivElement> | undefined
} & Block

export function Block({ type, text, isLoading, ref }: Props) {
  const slug = type === "header" ? slugify(text) : undefined

  return (
    <div
      className={clsx("block", type)}
      id={slug}
      ref={ref}
    >
      {type === "header" &&
        <Skeleton
          height={30}
          width={250}
          show={isLoading}
        >
          <HeaderBlock
            id={slug!}
            text={text}
          />
        </Skeleton>
      }
      {type === "paragraph" &&
        <MultilineSkeleton
          gap={11.5}
          height={17}
          lineCount={5 + Math.ceil(Math.random() * 4)}
          show={isLoading}
        >
          <span className="body">{text}</span>
        </MultilineSkeleton>
      }
      {type === "warning" && <WarningBlock>{text}</WarningBlock>}
    </div>
  )
}