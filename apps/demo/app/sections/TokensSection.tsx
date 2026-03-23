'use client'

import { DemoSection } from '../../components/DemoSection'

// ─── Colors ───────────────────────────────────────────────────

const primaryPalette = [
  { shade: 50,  hex: '#EFF6FF' }, { shade: 100, hex: '#DBEAFE' },
  { shade: 200, hex: '#BFDBFE' }, { shade: 300, hex: '#93C5FD' },
  { shade: 400, hex: '#60A5FA' }, { shade: 500, hex: '#3B82F6' },
  { shade: 600, hex: '#2563EB' }, { shade: 700, hex: '#1D4ED8' },
  { shade: 800, hex: '#1E3A8A' }, { shade: 900, hex: '#0F2D5E' },
]
const accentPalette = [
  { shade: 400, hex: '#FBBF24' },
  { shade: 500, hex: '#F59E0B' },
  { shade: 600, hex: '#D97706' },
]
const neutralPalette = [
  { shade: 0,   hex: '#FFFFFF' }, { shade: 50,  hex: '#F8FAFC' },
  { shade: 100, hex: '#F1F5F9' }, { shade: 200, hex: '#E2E8F0' },
  { shade: 300, hex: '#CBD5E1' }, { shade: 400, hex: '#94A3B8' },
  { shade: 500, hex: '#64748B' }, { shade: 600, hex: '#475569' },
  { shade: 700, hex: '#334155' }, { shade: 800, hex: '#1E293B' },
  { shade: 900, hex: '#0F172A' },
]
const semanticColors = [
  { label: 'Success', light: '#D1FAE5', base: '#10B981', dark: '#065F46' },
  { label: 'Warning', light: '#FEF3C7', base: '#F59E0B', dark: '#92400E' },
  { label: 'Error',   light: '#FEE2E2', base: '#EF4444', dark: '#991B1B' },
  { label: 'Info',    light: '#DBEAFE', base: '#3B82F6', dark: '#1E3A8A' },
]

// ─── Typography ───────────────────────────────────────────────

const fontFamilies = [
  { token: '--font-display', family: 'var(--font-display)', name: 'Plus Jakarta Sans', usage: 'Títulos y headings' },
  { token: '--font-body',    family: 'var(--font-body)',    name: 'Inter',             usage: 'Texto corrido y labels' },
  { token: '--font-mono',    family: 'var(--font-mono)',    name: 'JetBrains Mono',    usage: 'Código y datos' },
]
const typeSizes = [
  { name: 'xs',   px: '12px', sample: 'Caption, etiquetas pequeñas' },
  { name: 'sm',   px: '14px', sample: 'Texto de interfaz, labels' },
  { name: 'base', px: '16px', sample: 'Texto corrido principal' },
  { name: 'lg',   px: '18px', sample: 'Subtítulo, Heading 3' },
  { name: 'xl',   px: '20px', sample: 'Heading 2' },
  { name: '2xl',  px: '24px', sample: 'Heading 1' },
  { name: '3xl',  px: '30px', sample: 'Display L' },
  { name: '4xl',  px: '36px', sample: 'Display XL' },
]

// ─── Spacing & Radius ─────────────────────────────────────────

const spacingTokens = [
  { n: 1,  px: '4px'  }, { n: 2,  px: '8px'  }, { n: 3,  px: '12px' },
  { n: 4,  px: '16px' }, { n: 5,  px: '20px' }, { n: 6,  px: '24px' },
  { n: 8,  px: '32px' }, { n: 10, px: '40px' }, { n: 12, px: '48px' },
  { n: 16, px: '64px' },
]
const radiusTokens = [
  { name: 'sm',   px: '4px'    },
  { name: 'base', px: '8px'    },
  { name: 'md',   px: '12px'   },
  { name: 'lg',   px: '16px'   },
  { name: 'xl',   px: '24px'   },
  { name: 'full', px: '9999px' },
]

// ─── Shadows ──────────────────────────────────────────────────

const shadowTokens = ['sm', 'base', 'md', 'lg', 'xl'] as const

// ─── Helpers ──────────────────────────────────────────────────

const mono: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  lineHeight: 1.4,
}

/**
 * Render a compact color swatch with a primary label and optional subtitle.
 *
 * @param color - CSS color value (hex, rgb, or CSS variable) used for the swatch background
 * @param label - Primary label text displayed beneath the swatch
 * @param sub - Optional secondary label shown below `label`
 * @param lightBorder - When true, renders a visible border using `var(--color-border)`; otherwise the border is transparent
 * @returns A JSX element containing a colored square with the provided labels
 */
function Swatch({ color, label, sub, lightBorder = false }: {
  color: string; label: string; sub?: string; lightBorder?: boolean
}) {
  return (
    <div style={{ textAlign: 'center', minWidth: 52 }}>
      <div
        title={`${label}${sub ? ` — ${sub}` : ''}`}
        style={{
          width: 52, height: 44,
          borderRadius: 'var(--radius-base)',
          backgroundColor: color,
          border: lightBorder ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      />
      <div style={{ ...mono, color: 'var(--color-text-secondary)', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ ...mono, color: 'var(--color-text-secondary)', opacity: 0.7 }}>{sub}</div>}
    </div>
  )
}

/**
 * Renders the "Colors" demo subsection that visualizes design-system color tokens as swatches.
 *
 * The returned section displays primary, accent, neutral palettes and semantic (success/warning/error/info)
 * groups, with labels and hex (or CSS custom-property) values for each swatch.
 *
 * @returns A JSX element containing the Colors DemoSection with organized color swatch grids and labels.
 */

function ColorsSection() {
  return (
    <DemoSection title="Colors" tag="Tokens" description="Paleta de colores disponible como CSS custom properties">

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%' }}>

        {/* Primary */}
        <div>
          <p className="demo-label">Primary — <code style={mono}>--color-primary-*</code></p>
          <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
            {primaryPalette.map(({ shade, hex }) => (
              <Swatch
                key={shade}
                color={`var(--color-primary-${shade})`}
                label={String(shade)}
                sub={hex}
                lightBorder={shade <= 100}
              />
            ))}
          </div>
        </div>

        {/* Accent */}
        <div>
          <p className="demo-label">Accent — <code style={mono}>--color-accent-*</code></p>
          <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
            {accentPalette.map(({ shade, hex }) => (
              <Swatch key={shade} color={`var(--color-accent-${shade})`} label={String(shade)} sub={hex} />
            ))}
          </div>
        </div>

        {/* Neutral */}
        <div>
          <p className="demo-label">Neutral — <code style={mono}>--color-neutral-*</code></p>
          <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
            {neutralPalette.map(({ shade, hex }) => (
              <Swatch
                key={shade}
                color={`var(--color-neutral-${shade})`}
                label={String(shade)}
                sub={hex}
                lightBorder={shade <= 200}
              />
            ))}
          </div>
        </div>

        {/* Semantic */}
        <div>
          <p className="demo-label">Semantic — Success · Warning · Error · Info</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {semanticColors.map(({ label, light, base, dark }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
                <span style={{ ...mono, color: 'var(--color-text-secondary)', width: 60, flexShrink: 0 }}>{label}</span>
                <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                  <Swatch color={light} label="light" sub={light} lightBorder />
                  <Swatch color={base}  label="base"  sub={base}  />
                  <Swatch color={dark}  label="dark"  sub={dark}  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DemoSection>
  )
}

/**
 * Render the Typography tokens demo section showing configured font families and the type scale.
 *
 * The section lists font-family tokens with their display names and usage, and presents the type
 * scale entries with size tokens, pixel values, and sample text.
 *
 * @returns A JSX element containing the populated Typography DemoSection
 */

function TypographySection() {
  return (
    <DemoSection title="Typography" tag="Tokens" description="Familias tipográficas y escala de tamaños">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%' }}>

        {/* Font families */}
        <div>
          <p className="demo-label">Familias</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {fontFamilies.map(({ token, family, name, usage }) => (
              <div
                key={token}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-4)',
                  padding: 'var(--sp-4) 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <code style={{ ...mono, color: 'var(--color-primary-700)', width: 120, flexShrink: 0 }}>{token}</code>
                <span style={{ fontFamily: family, fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text-primary)', flex: 1 }}>
                  {name}
                </span>
                <span style={{ ...mono, color: 'var(--color-text-secondary)' }}>{usage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Type scale */}
        <div>
          <p className="demo-label">Escala de tamaños</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {typeSizes.map(({ name, px, sample }) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-4)',
                  padding: 'var(--sp-2) 0',
                  borderBottom: '1px solid var(--color-border)',
                  minHeight: 48,
                }}
              >
                <div style={{ width: 64, flexShrink: 0 }}>
                  <div style={{ ...mono, color: 'var(--color-primary-700)', fontWeight: 600 }}>{name}</div>
                  <div style={{ ...mono, color: 'var(--color-text-secondary)' }}>{px}</div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: `var(--text-${name})`,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {sample}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DemoSection>
  )
}

/**
 * Renders the "Spacing & Radius" demo section that visualizes spacing tokens as horizontal bars
 * and border-radius tokens as preview boxes.
 *
 * @returns A JSX element containing the demo section markup for spacing and border-radius tokens.
 */

function SpacingRadiusSection() {
  return (
    <DemoSection title="Spacing & Radius" tag="Tokens" description="Sistema de espaciado y bordes redondeados">
      <div style={{ display: 'flex', gap: 'var(--sp-12)', flexWrap: 'wrap', width: '100%', alignItems: 'flex-start' }}>

        {/* Spacing */}
        <div style={{ flex: '1 1 260px' }}>
          <p className="demo-label">Spacing — <code style={mono}>--sp-*</code></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            {spacingTokens.map(({ n, px }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', height: 28 }}>
                <code style={{ ...mono, color: 'var(--color-primary-700)', width: 40, flexShrink: 0 }}>sp-{n}</code>
                <div
                  style={{
                    height: 20,
                    width: `var(--sp-${n})`,
                    backgroundColor: 'var(--color-primary-500)',
                    borderRadius: 3,
                    flexShrink: 0,
                    minWidth: 4,
                  }}
                />
                <span style={{ ...mono, color: 'var(--color-text-secondary)' }}>{px}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div style={{ flex: '1 1 320px' }}>
          <p className="demo-label">Border Radius — <code style={mono}>--radius-*</code></p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {radiusTokens.map(({ name, px }) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: name === 'full' ? 56 : 56,
                    height: name === 'full' ? 56 : 56,
                    backgroundColor: 'var(--color-primary-100)',
                    border: '2px solid var(--color-primary-400)',
                    borderRadius: `var(--radius-${name})`,
                  }}
                />
                <div style={{ ...mono, color: 'var(--color-primary-700)', fontWeight: 600, marginTop: 6 }}>{name}</div>
                <div style={{ ...mono, color: 'var(--color-text-secondary)' }}>{px}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DemoSection>
  )
}

/**
 * Renders the "Shadows" demo subsection showing preview surfaces for each design-system shadow token.
 *
 * @returns A React element containing a grid of shadow samples, each labeled with its corresponding `shadow-{name}` token.
 */

function ShadowsSection() {
  return (
    <DemoSection title="Shadows" tag="Tokens" description="Escala de sombras del sistema de diseño">
      <div style={{ display: 'flex', gap: 'var(--sp-8)', flexWrap: 'wrap', width: '100%', padding: 'var(--sp-4) 0' }}>
        {shadowTokens.map((s) => (
          <div key={s} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 96,
                height: 96,
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: `var(--shadow-${s})`,
              }}
            />
            <code style={{ ...mono, color: 'var(--color-primary-700)', fontWeight: 600, display: 'block', marginTop: 10 }}>
              shadow-{s}
            </code>
          </div>
        ))}
      </div>
    </DemoSection>
  )
}

/**
 * Renders the Tokens section that showcases design-system token values for colors, typography, spacing/radius, and shadows.
 *
 * @returns The JSX element containing the composed subsections: Colors, Typography, Spacing & Radius, and Shadows.
 */

export function TokensSection() {
  return (
    <div id="tokens">
      <ColorsSection />
      <TypographySection />
      <SpacingRadiusSection />
      <ShadowsSection />
    </div>
  )
}
