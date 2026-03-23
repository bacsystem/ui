'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { Code, ChevronUp } from 'lucide-react'
import { CodeBlock } from './CodeBlock'

interface DemoSectionProps {
  readonly title: string
  readonly description?: string
  readonly tag?: string
  readonly code?: string
  readonly children: ReactNode
}

export function DemoSection({ title, description, tag, code, children }: DemoSectionProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <section className="demo-section">
      <div className="demo-section__header">
        <div className="demo-section__header-top">
          {tag && <span className="demo-section__tag">{tag}</span>}
          <h2 className="demo-section__title">{title}</h2>
          {code && (
            <button
              type="button"
              className={`demo-section__code-toggle${showCode ? ' demo-section__code-toggle--active' : ''}`}
              onClick={() => setShowCode((v) => !v)}
              aria-expanded={showCode}
              aria-label={showCode ? 'Ocultar código' : 'Ver código'}
            >
              {showCode
                ? <><ChevronUp size={13} aria-hidden="true" /> Ocultar</>
                : <><Code size={13} aria-hidden="true" /> Ver código</>}
            </button>
          )}
        </div>
        {description && <p className="demo-section__description">{description}</p>}
      </div>
      <div className="demo-section__content">{children}</div>
      {code && showCode && <CodeBlock code={code} />}
    </section>
  )
}
