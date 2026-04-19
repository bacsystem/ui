import { createElement, forwardRef, isValidElement } from 'react'
import type { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface TabItem {
  readonly id: string
  readonly label: string
  readonly icon?: LucideIcon | ReactNode
  readonly disabled?: boolean
  readonly content: ReactNode
}

export interface LegacyTabsProps {
  readonly items: TabItem[]
  readonly defaultTab?: string
  readonly activeTab?: string
  readonly onChange?: (tabId: string) => void
  readonly onTabChange?: (tabId: string) => void
  readonly className?: string
}

export interface TabsProps extends Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, 'onChange' | 'defaultValue' | 'value'> {
  readonly items?: TabItem[]
  readonly defaultTab?: string
  readonly activeTab?: string
  readonly onChange?: (tabId: string) => void
  readonly onTabChange?: (tabId: string) => void
}

/**
 * Selects the initial active tab id from the available tab items and an optional preferred default.
 *
 * @param items - Array of tab items to choose from
 * @param defaultTab - Preferred tab id to use if it exists in `items` and is not disabled
 * @returns The chosen tab id: `defaultTab` when present and enabled; otherwise the first enabled tab's id; or an empty string if no enabled tab exists
 */
function resolveInitialTab(items: readonly TabItem[], defaultTab: string | undefined): string {
  if (defaultTab !== undefined) {
    const found = items.find((t) => t.id === defaultTab)
    if (found && !found.disabled) return defaultTab
  }
  return items.find((t) => !t.disabled)?.id ?? ''
}

function renderTabIcon(icon: TabItem['icon']): ReactNode {
  if (!icon) {
    return null
  }

  if (isValidElement(icon)) {
    return <span className="bac-tabs__tab-icon" aria-hidden="true">{icon}</span>
  }

  return createElement(icon as ElementType, {
    className: 'bac-tabs__tab-icon',
    size: 16,
    'aria-hidden': 'true',
  })
}

function isLegacyTabsProps(props: TabsProps): props is LegacyTabsProps {
  return Array.isArray(props.items)
}

/**
 * Renders a tabbed interface with selectable tabs and an associated content panel; supports controlled (`activeTab`) and uncontrolled (`defaultTab`) selection.
 *
 * @param items - Array of tab definitions including `id`, `label`, optional `icon`, optional `disabled`, and `content`.
 * @param defaultTab - Optional initial tab id used when the component is uncontrolled.
 * @param activeTab - Optional controlled active tab id; when provided the component does not manage selection state internally.
 * @param onChange - Optional callback invoked with the newly selected tab id whenever a tab is selected.
 * @param className - Optional additional CSS class applied to the root element.
 * @returns The rendered tabs component element.
 */
export function Tabs(props: Readonly<TabsProps>) {
  if (isLegacyTabsProps(props)) {
    const {
      items,
      defaultTab,
      activeTab,
      onChange,
      onTabChange,
      className = '',
    } = props

    if (items.length === 0) {
      return null
    }

    if (items.every((item) => item.disabled)) {
      return null
    }

    const initialTab = resolveInitialTab(items, defaultTab)
    const value = activeTab ?? undefined

    const handleValueChange = (nextValue: string) => {
      onChange?.(nextValue)
      onTabChange?.(nextValue)
    }

    return (
      <TabsPrimitive.Root
        className={cn('bac-tabs', className)}
        defaultValue={value === undefined ? initialTab : undefined}
        value={value}
        onValueChange={handleValueChange}
      >
        <TabsList aria-label="Tabs navigation">
          {items.map((item) => (
            <TabsTrigger key={item.id} value={item.id} disabled={item.disabled}>
              {renderTabIcon(item.icon)}
              <span>{item.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map((item) => (
          <TabsContent key={item.id} value={item.id}>
            {item.content}
          </TabsContent>
        ))}
      </TabsPrimitive.Root>
    )
  }

  const {
    className = '',
    items: _items,
    defaultTab: _defaultTab,
    activeTab: _activeTab,
    onChange: _onChange,
    onTabChange: _onTabChange,
    ...rest
  } = props
  return <TabsPrimitive.Root className={cn('bac-tabs', className)} {...rest} />
}

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>
export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

export const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(({ className = '', ...props }, ref) => (
  <div className="bac-tabs__bar">
    <TabsPrimitive.List ref={ref} className={cn('bac-tabs__list', className)} {...props} />
  </div>
))

TabsList.displayName = 'TabsList'

export const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(({ className = '', ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn('bac-tabs__tab', className)} {...props} />
))

TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = forwardRef<ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(({ className = '', ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('bac-tabs__panel', className)} {...props} />
))

TabsContent.displayName = 'TabsContent'
