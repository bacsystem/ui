'use client'

import { useState, useEffect } from 'react'
import '@bacsystem/ui/styles.css'
import './globals.css'
import { DemoHeader } from './DemoHeader'
import { Menu, X } from 'lucide-react'

const navGroups = [
  {
    label: 'Foundation',
    links: [
      { href: '#tokens', label: 'Design Tokens' },
    ],
  },
  {
    label: 'Components',
    links: [
      { href: '#button', label: 'Button' },
      { href: '#badge', label: 'Badge' },
      { href: '#input', label: 'Input' },
      { href: '#card', label: 'Card' },
      { href: '#alert', label: 'Alert' },
      { href: '#avatar', label: 'Avatar' },
      { href: '#toggle', label: 'Toggle' },
      { href: '#modal', label: 'Modal' },
      { href: '#datatable', label: 'DataTable' },
      { href: '#statcard', label: 'StatCard' },
      { href: '#tabs', label: 'Tabs' },
      { href: '#tooltip', label: 'Tooltip' },
      { href: '#skeleton', label: 'Skeleton' },
      { href: '#select', label: 'Select' },
      { href: '#breadcrumb', label: 'Breadcrumb' },
    ],
  },
  {
    label: 'Hooks',
    links: [
      { href: '#hooks', label: 'Hooks' },
    ],
  },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!('matchMedia' in globalThis)) return

    const mq = globalThis.matchMedia('(min-width: 768px)')
    const handler = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setSidebarOpen(false)
      }
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!sidebarOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false)
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen])

  const closeNav = () => setSidebarOpen(false)

  return (
    <html lang="en">
      <head>
        <title>@bacsystem/ui — Component Library Demo</title>
        <meta name="description" content="Interactive showcase of the bacsystem design system" />
      </head>
      <body>
        <div className="demo-layout">
          {/* Hamburger button — only visible on mobile */}
          <button
            type="button"
            className="demo-hamburger"
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={sidebarOpen}
            aria-controls="demo-sidebar"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="demo-sidebar__overlay"
              aria-hidden="true"
              onClick={closeNav}
            />
          )}

          <aside id="demo-sidebar" className={`demo-sidebar${sidebarOpen ? ' demo-sidebar--open' : ''}`}>
            <div className="demo-sidebar__brand">
              <h1>@bacsystem/ui</h1>
              <p>Design System</p>
            </div>
            <nav className="demo-sidebar__nav">
              {navGroups.map((group) => (
                <div key={group.label} className="demo-sidebar__nav-group">
                  <p className="demo-sidebar__nav-group-label">{group.label}</p>
                  {group.links.map((link) => (
                    <a key={link.href} href={link.href} onClick={closeNav}>{link.label}</a>
                  ))}
                </div>
              ))}
            </nav>
          </aside>

          <div className="demo-main">
            <DemoHeader />
            <main className="demo-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
