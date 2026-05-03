import React from 'react'
import './SideBar.css'

export default function SideBar({ children }) {
  return (
    <div className="sidebar-container">
        { children }
    </div>
  )
}
