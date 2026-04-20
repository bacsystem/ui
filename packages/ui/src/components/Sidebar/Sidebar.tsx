'use client'

import { createElement, forwardRef, isValidElement, useId } from 'react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useDisclosure } from '../../hooks/useDisclosure'
import { useControllableState } from '../../hooks/useControllableState'

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  readonly collapsible?: boolean
  readonly collapsed?: boolean
  readonly defaultCollapsed?: boolean
  readonly onCollapsedChange?: (collapsed: boolean) => void
}
export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {}

export interface SidebarNavProps extends HTMLAttributes<HTMLElement> {
  readonly label?: string
}

type SidebarIcon = LucideIcon | ReactNode

interface SidebarNavItemBaseProps {
  readonly icon?: SidebarIcon
  readonly active?: boolean
  readonly disabled?: boolean
  readonly className?: string
  readonly children: ReactNode
}

type SidebarNavItemAnchorProps = SidebarNavItemBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  readonly href: string
}

type SidebarNavItemButtonProps = SidebarNavItemBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly href?: never
}

export type SidebarNavItemProps = SidebarNavItemAnchorProps | SidebarNavItemButtonProps

export interface SidebarNavGroupProps extends HTMLAttributes<HTMLDivElement> {
  readonly label: string
  readonly icon?: SidebarIcon
  readonly defaultOpen?: boolean
  readonly collapsible?: boolean
  readonly children: ReactNode
}

function renderSidebarIcon(icon: SidebarIcon | undefined): ReactNode {
  if (!icon) {
    return null
  }

  if (isValidElement(icon)) {
    return <span className="bac-sidebar__icon" aria-hidden="true">{icon}</span>
  }

  return createElement(icon as ElementType, {
    className: 'bac-sidebar__icon',
    size: 16,
    'aria-hidden': 'true',
  })
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(({ collapsible = false, collapsed, defaultCollapsed, onCollapsedChange, className = '', ...props }, ref) => {
  const collapseState = useControllableState<boolean>({
    value: collapsed,
    defaultValue: defaultCollapsed ?? false,
    onChange: onCollapsedChange,
  })

  return (
    <aside
      ref={ref}
      className={cn(
        'bac-sidebar',
        collapsible && 'bac-sidebar--collapsible',
        collapsible && collapseState.value && 'bac-sidebar--collapsed',
        className,
      )}
      {...props}
    />
  )
})

Sidebar.displayName = 'Sidebar'

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={cn('bac-sidebar__header', className)} {...props} />
))

SidebarHeader.displayName = 'SidebarHeader'

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={cn('bac-sidebar__content', className)} {...props} />
))

SidebarContent.displayName = 'SidebarContent'

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={cn('bac-sidebar__footer', className)} {...props} />
))

SidebarFooter.displayName = 'SidebarFooter'

export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(({ label = 'Sidebar navigation', className = '', ...props }, ref) => (
  <nav ref={ref} aria-label={label} className={cn('bac-sidebar__nav', className)} {...props} />
))

SidebarNav.displayName = 'SidebarNav'

export function SidebarNavItem(props: Readonly<SidebarNavItemProps>) {
  if ('href' in props) {
    const {
      href,
      icon,
      active = false,
      disabled = false,
      className = '',
      children,
      onClick,
      onKeyDown,
      ...anchorProps
    } = props as SidebarNavItemAnchorProps
    const classes = cn('bac-sidebar__nav-item', active && 'bac-sidebar__nav-item--active', disabled && 'bac-sidebar__nav-item--disabled', className)

    return (
      <a
        {...anchorProps}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        className={classes}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault()
            event.stopPropagation()
            return
          }
          onClick?.(event)
        }}
        onKeyDown={(event) => {
          if (!disabled) {
            onKeyDown?.(event)
            return
          }

          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            event.stopPropagation()
          }
          onKeyDown?.(event)
        }}
      >
        {renderSidebarIcon(icon)}
        <span className="bac-sidebar__nav-label">{children}</span>
      </a>
    )
  }

  const { icon, active = false, disabled = false, className = '', children, ...buttonProps } = props as SidebarNavItemButtonProps
  const classes = cn('bac-sidebar__nav-item', active && 'bac-sidebar__nav-item--active', disabled && 'bac-sidebar__nav-item--disabled', className)

  return (
    <button type="button" {...buttonProps} disabled={disabled} className={classes}>
      {renderSidebarIcon(icon)}
      <span className="bac-sidebar__nav-label">{children}</span>
    </button>
  )
}

export function SidebarNavGroup({ label, icon, defaultOpen = true, collapsible = true, className = '', children, ...props }: Readonly<SidebarNavGroupProps>) {
  const disclosure = useDisclosure({ defaultOpen })
  const panelId = useId().replaceAll(':', '')
  const isOpen = collapsible ? disclosure.open : true

  return (
    <div className={cn('bac-sidebar__nav-group', isOpen && 'bac-sidebar__nav-group--open', className)} {...props}>
      <button
        type="button"
        className="bac-sidebar__nav-group-header"
        aria-expanded={isOpen}
        aria-controls={`bac-sidebar-group-${panelId}`}
        onClick={collapsible ? disclosure.onToggle : undefined}
      >
        <span className="bac-sidebar__nav-group-label-wrap">
          {renderSidebarIcon(icon)}
          <span className="bac-sidebar__nav-group-label">{label}</span>
        </span>
        {collapsible ? <ChevronDown className="bac-sidebar__nav-group-chevron" size={16} aria-hidden="true" /> : null}
      </button>
      <div id={`bac-sidebar-group-${panelId}`} className="bac-sidebar__nav-group-items" hidden={!isOpen}>
        {children}
      </div>
    </div>
  )
}