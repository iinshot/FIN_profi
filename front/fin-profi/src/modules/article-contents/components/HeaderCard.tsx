import clsx from 'clsx'

type HeaderCardProps = {
  active: boolean,
  getNode: () => HTMLDivElement | undefined,
  text: string
}

export function HeaderCard({ active, getNode, text }: HeaderCardProps) {
  return (
    <div
      onClick={() => {
        const node = getNode()

        node?.scrollIntoView({ behavior: "smooth" })
      }}
      className={clsx(
        active ? "card-header" : "small",
        "contents-header"
      )}
    >{text}</div>
  )
}
