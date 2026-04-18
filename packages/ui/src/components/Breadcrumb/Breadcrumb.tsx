'use client'

export interface BreadcrumbItem {
  readonly label: string
  readonly href?: string
}

export interface BreadcrumbProps {
  readonly items: BreadcrumbItem[]
  readonly separator?: string
  readonly className?: string
}

export function Breadcrumb({
  items,
  separator = '/',
  className = '',
}: BreadcrumbProps) {
  const rootClassName = ['bac-breadcrumb', className].filter(Boolean).join(' ')

  return (
    <nav
      aria-label="Breadcrumb"
      className={rootClassName}
    >
      <ol className="bac-breadcrumb__list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          return (
            <li
              key={`${item.label}-${index}`}
              className={`bac-breadcrumb__item${isCurrent ? ' bac-breadcrumb__item--current' : ''}`}
            >
              {index > 0 && (
                <span className="bac-breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
              {isCurrent || !item.href ? (
                <span aria-current={isCurrent ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
