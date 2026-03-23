import type { ReactNode } from 'react'

interface DemoSectionProps {
  readonly title: string
  readonly description?: string
  readonly tag?: string
  readonly children: ReactNode
}

/**
 * Render a sectioned demo block with a header (optional tag and description) and a content area.
 *
 * @param title - The section title displayed prominently in the header
 * @param description - Optional descriptive text shown below the title when provided
 * @param tag - Optional short label shown before the title when provided
 * @param children - Content to render inside the section's content area
 * @returns The React element representing the demo section
 */
export function DemoSection({ title, description, tag, children }: DemoSectionProps) {
  return (
    <section className="demo-section">
      <div className="demo-section__header">
        <div className="demo-section__header-top">
          {tag && <span className="demo-section__tag">{tag}</span>}
          <h2 className="demo-section__title">{title}</h2>
        </div>
        {description && <p className="demo-section__description">{description}</p>}
      </div>
      <div className="demo-section__content">{children}</div>
    </section>
  )
}
