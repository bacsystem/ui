import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface TabItem {
  id: string
  label: string
  icon?: LucideIcon
  disabled?: boolean
  content: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultTab?: string
  activeTab?: string
  onChange?: (tabId: string) => void
  className?: string
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
  const isControlled = controlledTab !== undefined
  const [internalTab, setInternalTab] = useState(
    defaultTab ?? items.find((t) => !t.disabled)?.id ?? ''
  )

  const activeId = isControlled ? controlledTab : internalTab

  const handleSelect = (id: string) => {
    if (!isControlled) setInternalTab(id)
    onChange?.(id)
  }

  const activeContent = items.find((t) => t.id === activeId)?.content

  return (
    <div className={`bac-tabs${className ? ` ${className}` : ''}`}>
      <div className="bac-tabs__bar">
        <div className="bac-tabs__list" role="tablist">
          {items.map((tab) => {
            const Icon = tab.icon
            const isActive = activeId === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`bac-tab-panel-${tab.id}`}
                id={`bac-tab-${tab.id}`}
                disabled={tab.disabled}
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
      <div
        id={`bac-tab-panel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`bac-tab-${activeId}`}
        className="bac-tabs__panel"
      >
        {activeContent}
      </div>
    </div>
  )
}
