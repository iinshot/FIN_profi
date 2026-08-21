import { motion, MotionProps } from 'framer-motion'

import { Article } from '@/modules/main'
import { CheckCircle } from '@/assets/icons'
import clsx from 'clsx'

type ArticleListNodeProps = {
  data: Article
}

export function ArticleListNode({ data }: ArticleListNodeProps) {
  const animation: MotionProps = {
    initial: {
      opacity: 0,
      scale: 0.9
    },

    animate: {
      opacity: 1,
      scale: 1
    },

    transition: {
      delay: 0.23 + 0.1 * Math.min(data.id, 10)
    }
  }

  const progressAnimation: MotionProps = data.isRead ? {} : {
    initial: { background: `conic-gradient(var(--dark-yellow) ${0}%, var(--surface-light) ${0}%)` },
    animate: { background: `conic-gradient(var(--dark-yellow) ${data.progress}%, var(--surface-light) ${data.progress}%)` },
    transition: { delay: 0.33 }
  }

  return (
    <motion.div
      {...animation}
      className="article-list-node"
      onClick={() => {
        const element = document.getElementById(`article-${data.id}`)

        if (element) element.scrollIntoView({ behavior: "smooth", block: 'center' })
      }}
    >
      <div className="article-list-node-number h3">{data.id}</div>

      <span className="title card-header">{data.name}</span>

      <motion.div
        {...progressAnimation}
        className="point-progress"
      >
        <CheckCircle className={clsx({ active: data.isRead })} />
      </motion.div>
    </motion.div>
  )
}
