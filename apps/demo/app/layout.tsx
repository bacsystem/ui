'use client'

import { useState, useEffect } from 'react'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '@bacsystem/ui/styles.css'
import './globals.css'
import { DemoHeader } from './DemoHeader'
import { Menu, X } from 'lucide-react'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
})

const themeBootScript = `
  (function () {
    try {
      var key = 'bacsystem-ui-theme';
      var stored = localStorage.getItem(key);
      var theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
      var resolved = theme === 'system'
        ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme;
      var root = document.documentElement;
      root.dataset.theme = resolved;
      root.dataset.themeMode = theme;
      root.style.colorScheme = resolved;
    } catch {
      document.documentElement.dataset.theme = 'light';
      document.documentElement.dataset.themeMode = 'system';
      document.documentElement.style.colorScheme = 'light';
    }
  })();
`

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
      { href: '#label', label: 'Label' },
      { href: '#spinner', label: 'Spinner' },
      { href: '#progressbar', label: 'ProgressBar' },
      { href: '#card', label: 'Card' },
      { href: '#alert', label: 'Alert' },
      { href: '#avatar', label: 'Avatar' },
      { href: '#toggle', label: 'Toggle' },
      { href: '#modal', label: 'Modal' },
      { href: '#datatable', label: 'DataTable' },
      { href: '#table', label: 'Table' },
      { href: '#emptystate', label: 'EmptyState' },
      { href: '#statcard', label: 'StatCard' },
      { href: '#stepper', label: 'Stepper' },
      { href: '#tabs', label: 'Tabs' },
      { href: '#header', label: 'Header' },
      { href: '#sidebar', label: 'Sidebar' },
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
  const [activeHash, setActiveHash] = useState('#tokens')

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

  useEffect(() => {
    if (!('IntersectionObserver' in globalThis)) return

    const sectionIds = navGroups.flatMap((group) => group.links.map((link) => link.href.slice(1)))
    const sections = sectionIds
      .map((id) => globalThis.document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

        if (!visibleEntries.length) return

        const nextId = visibleEntries[0].target.getAttribute('id')
        if (nextId) {
          setActiveHash(`#${nextId}`)
        }
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.45, 0.7],
      },
    )

    sections.forEach((section) => observer.observe(section))

    const initialHash = globalThis.location.hash
    if (initialHash) {
      setActiveHash(initialHash)
    }

    return () => observer.disconnect()
  }, [])

  const closeNav = () => setSidebarOpen(false)

  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        <title>@bacsystem/ui — Component Library Demo</title>
        <meta name="description" content="Interactive showcase of the bacsystem design system" />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <div className="demo-background" aria-hidden="true">
          <div className="demo-background__orb demo-background__orb--one" />
          <div className="demo-background__orb demo-background__orb--two" />
          <div className="demo-background__orb demo-background__orb--three" />
          <div className="demo-background__grid" />
        </div>
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
              <span className="demo-sidebar__eyebrow">v1.2.0 · Premium showcase</span>
              <h1>@bacsystem/ui</h1>
              <p>Explora componentes, tokens y hooks con una experiencia más editorial, más viva y más cercana a producto final.</p>
              <div className="demo-sidebar__meta">
                <div>
                  <strong>23</strong>
                  <span>componentes</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>hooks/utilities</span>
                </div>
              </div>
            </div>
            <nav className="demo-sidebar__nav">
              {navGroups.map((group) => (
                <div key={group.label} className="demo-sidebar__nav-group">
                  <p className="demo-sidebar__nav-group-label">{group.label}</p>
                  {group.links.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeNav}
                      className={activeHash === link.href ? 'demo-sidebar__nav-link demo-sidebar__nav-link--active' : 'demo-sidebar__nav-link'}
                      aria-current={activeHash === link.href ? 'location' : undefined}
                    >
                      <span className="demo-sidebar__nav-index">{String(index + 1).padStart(2, '0')}</span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              ))}
            </nav>
            <div className="demo-sidebar__footer-note">
              <span className="demo-sidebar__footer-kicker">Visual system</span>
              <p>Diseñado para presentar estados, combinaciones y patrones reales de uso.</p>
            </div>
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
