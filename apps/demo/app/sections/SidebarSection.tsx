'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarNav, SidebarNavGroup, SidebarNavItem } from '@bacsystem/ui'
import { BarChart3, Boxes, FolderKanban, Settings, ShoppingCart } from 'lucide-react'
import { DemoSection } from '../../components/DemoSection'
import { sidebarPropRows } from '../../components/propTables'

export function SidebarSection() {
  return (
    <div id="sidebar">
      <DemoSection
        title="Sidebar"
        tag="Component"
        description="Primitivas para navegación lateral con items, grupos colapsables y zonas de header/footer."
        props={sidebarPropRows}
        code={`
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarNav, SidebarNavGroup, SidebarNavItem,
} from '@bacsystem/ui'

<Sidebar>
  <SidebarHeader>Commerce Ops</SidebarHeader>
  <SidebarContent>
    <SidebarNav>
      <SidebarNavItem active href="#overview">Overview</SidebarNavItem>
      <SidebarNavGroup label="Catálogo">
        <SidebarNavItem href="#products">Productos</SidebarNavItem>
      </SidebarNavGroup>
    </SidebarNav>
  </SidebarContent>
</Sidebar>
`}
      >
        <div style={{ maxWidth: 320, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--demo-border-strong)', background: 'var(--demo-surface-soft)', boxShadow: '0 18px 40px -32px rgba(15, 23, 42, 0.5)' }}>
          <Sidebar style={{ minHeight: 420 }}>
            <SidebarHeader>
              <div>
                <strong>Commerce Ops</strong>
                <p style={{ marginTop: 4, fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Panel de operaciones</p>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav>
                <SidebarNavItem href="#overview" icon={BarChart3} active>Overview</SidebarNavItem>
                <SidebarNavGroup label="Catálogo" icon={FolderKanban}>
                  <SidebarNavItem href="#productos" icon={Boxes}>Productos</SidebarNavItem>
                  <SidebarNavItem href="#pedidos" icon={ShoppingCart}>Pedidos</SidebarNavItem>
                </SidebarNavGroup>
                <SidebarNavItem href="#ajustes" icon={Settings}>Configuración</SidebarNavItem>
              </SidebarNav>
            </SidebarContent>
            <SidebarFooter>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Sincronizado hace 2 min</span>
            </SidebarFooter>
          </Sidebar>
        </div>
      </DemoSection>
    </div>
  )
}