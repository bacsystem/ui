interface DemoSectionProps {
  readonly title: string
  readonly description?: string
  readonly tag?: string
  readonly children: React.ReactNode
}

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
