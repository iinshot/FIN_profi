import React from 'react'
import './Content.css'

export default function Content({ children, style }) {
  return (
    <div className="content-container" style={style}>
      {children}
    </div>
  )
}
