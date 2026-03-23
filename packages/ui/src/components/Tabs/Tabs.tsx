import { useState, useRef, useMemo } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface TabItem {
  id: string
  label: string
  icon?: LucideIcon
  disabled?: boolean
  content: ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultTab?: string
  activeTab?: string
  onChange?: (tabId: string) => void
  className?: string
}

function resolveInitialTab(items: TabItem[], defaultTab: string | undefined): string {
  if (defaultTab !== undefined) {
    const found = items.find((t) => t.id === defaultTab)
    if (found && !found.disabled) return defaultTab
  }
  return items.find((t) => !t.disabled)?.id ?? ''
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
export function Tabs({
  items,
  defaultTab,
  activeTab: controlledTab,
  onChange,
  className = '',
}: TabsProps) {
  const firstEnabledId = useMemo(() => items.find((t) => !t.disabled)?.id ?? '', [items])
  const isControlled = controlledTab !== undefined
  const [internalTab, setInternalTab] = useState(() => resolveInitialTab(items, defaultTab))
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const rawActiveId = isControlled ? controlledTab : internalTab
  const activeId = useMemo(
    () => (items.some((t) => t.id === rawActiveId && !t.disabled) ? rawActiveId : firstEnabledId),
    [items, rawActiveId, firstEnabledId],
  )

  const handleSelect = (id: string) => {
    if (!isControlled) setInternalTab(id)
    onChange?.(id)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const enabledItems = items.filter((t) => !t.disabled)
    if (enabledItems.length === 0) return
    const currentIndex = enabledItems.findIndex((t) => t.id === activeId)
    const safeIndex = currentIndex === -1 ? 0 : currentIndex

    let nextIndex: number | null = null
    if (e.key === 'ArrowRight') nextIndex = (safeIndex + 1) % enabledItems.length
    else if (e.key === 'ArrowLeft') nextIndex = (safeIndex - 1 + enabledItems.length) % enabledItems.length
    else if (e.key === 'Home') nextIndex = 0
    else if (e.key === 'End') nextIndex = enabledItems.length - 1

    if (nextIndex !== null) {
      e.preventDefault()
      const nextId = enabledItems[nextIndex].id
      handleSelect(nextId)
      const nextItemIndex = items.findIndex((t) => t.id === nextId)
      tabRefs.current[nextItemIndex]?.focus()
    }
  }

  const activeContent = items.find((t) => t.id === activeId)?.content

  if (items.length === 0 || items.every((t) => t.disabled)) return null

  return (
    <div className={`bac-tabs${className ? ` ${className}` : ''}`}>
      <div className="bac-tabs__bar">
        <div className="bac-tabs__list" role="tablist" onKeyDown={handleKeyDown}>
          {items.map((tab, index) => {
            const Icon = tab.icon
            const isActive = activeId === tab.id
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[index] = el }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`bac-tab-panel-${tab.id}`}
                id={`bac-tab-${tab.id}`}
                disabled={tab.disabled}
                tabIndex={isActive ? 0 : -1}
                onClick={() => !tab.disabled && handleSelect(tab.id)}
                className={`bac-tabs__tab${isActive ? ' bac-tabs__tab--active' : ''}${tab.disabled ? ' bac-tabs__tab--disabled' : ''}`}
              >
                {Icon && (
                  <Icon
                    className="bac-tabs__tab-icon"
                    size={16}
                    aria-hidden="true"
                  />
                )}
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
      {activeId && (
        <div
          id={`bac-tab-panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`bac-tab-${activeId}`}
          className="bac-tabs__panel"
        >
          {activeContent}
        </div>
      )}
    </div>
  )
}
