import type { Metadata } from 'next'
import '@bacsystem/ui/styles.css'
import './globals.css'
import { DemoHeader } from './DemoHeader'

export const metadata: Metadata = {
  title: '@bacsystem/ui — Component Library Demo',
  description: 'Interactive showcase of the bacsystem design system',
}

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
    ],
  },
  {
    label: 'Hooks',
    links: [
      { href: '#hooks', label: 'Hooks' },
    ],
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="demo-layout">
          <aside className="demo-sidebar">
            <div className="demo-sidebar__brand">
              <h1>@bacsystem/ui</h1>
              <p>v1.0.0 — Design System</p>
            </div>
            <nav className="demo-sidebar__nav">
              {navGroups.map((group) => (
                <div key={group.label} className="demo-sidebar__nav-group">
                  <p className="demo-sidebar__nav-group-label">{group.label}</p>
                  {group.links.map((link) => (
                    <a key={link.href} href={link.href}>{link.label}</a>
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
