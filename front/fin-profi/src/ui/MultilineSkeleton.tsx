import { PropsWithChildren, useMemo } from 'react'
import { Skeleton } from './Skeleton'

type MultilineSkeletonProps = PropsWithChildren<{
  lineCount: number,
  height: number,
  gap: number,
  show: boolean
}>

export function MultilineSkeleton({ lineCount, height, gap, show, children }: MultilineSkeletonProps) {
  const arr = useMemo(() => {
    return Array.from({ length: lineCount })
  }, [lineCount])

  return show ? (
    <div
      className="multiline-skeleton"
      style={{ gap }}
    >
      {arr.map((_, index) => {
        const width = (index === lineCount - 1) ? `${Math.trunc(Math.random() * 80) + 10}%` : undefined

        return <Skeleton
          key={index}
          height={height}
          width={width}
          show={true}
        />
      })}
    </div>
  ) : children
}