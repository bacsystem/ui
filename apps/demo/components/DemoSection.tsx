'use client'

import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { Code, ChevronUp, List } from 'lucide-react'
import { CodeBlock } from './CodeBlock'
import { DynamicComponentShowcase, hasDynamicShowcase } from './DynamicComponentShowcase'

export interface PropRow {
  readonly prop: string
  readonly type: string
  readonly default: string
  readonly description: string
}

interface DemoSectionProps {
  readonly title: string
  readonly description?: string
  readonly tag?: string
  readonly code?: string
  readonly props?: readonly PropRow[]
  readonly children: ReactNode
}

export function DemoSection({ title, description, tag, code, props, children }: DemoSectionProps) {
  const [showCode, setShowCode] = useState(false)
  const [showProps, setShowProps] = useState(false)
  const sectionId = useId().replaceAll(':', '')
  const propsPanelId = `demo-props-${sectionId}`
  const codePanelId = `demo-code-${sectionId}`
  const accentLabel = tag ?? 'component demo'
  const shouldRenderDynamicShowcase = hasDynamicShowcase({ title, tag })

  return (
    <section className="demo-section">
      <div className="demo-section__ambient" aria-hidden="true" />
      <div className="demo-section__header">
        <div className="demo-section__header-top">
          <div className="demo-section__title-group">
            <span className="demo-section__eyebrow">{accentLabel}</span>
            <div className="demo-section__title-row">
              {tag && <span className="demo-section__tag">{tag}</span>}
              <h2 className="demo-section__title">{title}</h2>
            </div>
            {description && <p className="demo-section__description">{description}</p>}
          </div>
          {(code || props?.length) && (
            <div className="demo-section__actions">
              {props?.length ? (
                <button
                  type="button"
                  className={`demo-section__code-toggle${showProps ? ' demo-section__code-toggle--active' : ''}`}
                  onClick={() => setShowProps((value) => !value)}
                  aria-expanded={showProps}
                  aria-controls={propsPanelId}
                  aria-label={showProps ? 'Ocultar props' : 'Ver props'}
                >
                  {showProps
                    ? <><ChevronUp size={13} aria-hidden="true" /> Ocultar props</>
                    : <><List size={13} aria-hidden="true" /> Ver props</>}
                </button>
              ) : null}
              {code && (
                <button
                  type="button"
                  className={`demo-section__code-toggle${showCode ? ' demo-section__code-toggle--active' : ''}`}
                  onClick={() => setShowCode((value) => !value)}
                  aria-expanded={showCode}
                  aria-controls={codePanelId}
                  aria-label={showCode ? 'Ocultar código' : 'Ver código'}
                >
                  {showCode
                    ? <><ChevronUp size={13} aria-hidden="true" /> Ocultar</>
                    : <><Code size={13} aria-hidden="true" /> Ver código</>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="demo-section__content">
        {children}
        {shouldRenderDynamicShowcase && (
          <div style={{ marginTop: 'var(--sp-8, 32px)' }}>
            <p className="demo-label">Dynamic Motion</p>
            <DynamicComponentShowcase title={title} tag={tag} />
          </div>
        )}
      </div>
      {props?.length && showProps && (
        <div id={propsPanelId} className="demo-props-table-wrapper">
          <table className="demo-props-table">
            <thead>
              <tr>
                <th scope="col">Prop</th>
                <th scope="col">Tipo</th>
                <th scope="col">Default</th>
                <th scope="col">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {props.map((row) => (
                <tr key={row.prop}>
                  <td>{row.prop}</td>
                  <td>{row.type}</td>
                  <td>{row.default}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {code && showCode && <div id={codePanelId}><CodeBlock code={code} /></div>}
    </section>
  )
}
