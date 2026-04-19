import { TokensSection } from './sections/TokensSection'
import { ButtonSection } from './sections/ButtonSection'
import { BadgeSection } from './sections/BadgeSection'
import { InputSection } from './sections/InputSection'
import { LabelSection } from './sections/LabelSection'
import { SpinnerSection } from './sections/SpinnerSection'
import { ProgressBarSection } from './sections/ProgressBarSection'
import { CardSection } from './sections/CardSection'
import { AlertSection } from './sections/AlertSection'
import { AvatarSection } from './sections/AvatarSection'
import { ToggleSection } from './sections/ToggleSection'
import { ModalSection } from './sections/ModalSection'
import { DataTableSection } from './sections/DataTableSection'
import { TableSection } from './sections/TableSection'
import { EmptyStateSection } from './sections/EmptyStateSection'
import { StatCardSection } from './sections/StatCardSection'
import { StepperSection } from './sections/StepperSection'
import { TabsSection } from './sections/TabsSection'
import { HeaderSection } from './sections/HeaderSection'
import { SidebarSection } from './sections/SidebarSection'
import { TooltipSection } from './sections/TooltipSection'
import { SkeletonSection } from './sections/SkeletonSection'
import { SelectSection } from './sections/SelectSection'
import { BreadcrumbSection } from './sections/BreadcrumbSection'
import { HooksSection } from './sections/HooksSection'
import { ArrowRight, Sparkles } from 'lucide-react'

/**
 * Renders the demo page composed of the library's UI section components.
 *
 * @returns A React fragment containing the page sections in order for the public component showcase of the library.
 */
export default function Home() {
  return (
    <>
      <section className="demo-hero">
        <div className="demo-hero__glow" aria-hidden="true" />
        <div className="demo-hero__copy">
          <span className="demo-hero__eyebrow">bacsystem design system</span>
          <h1 className="demo-hero__title">Componentes que no solo funcionan: se sienten listos para impresionar.</h1>
          <p className="demo-hero__description">Esta experiencia pone en primer plano la expresividad visual del sistema, la riqueza de estados y la sensación de calidad percibida al explorar cada primitive, wrapper y patrón absorbido.</p>
          <div className="demo-hero__marquee" aria-label="Highlights del showcase">
            <span><Sparkles size={14} aria-hidden="true" /> Exploración guiada</span>
            <span><Sparkles size={14} aria-hidden="true" /> Navegación activa</span>
            <span><Sparkles size={14} aria-hidden="true" /> Demo orientado a impacto</span>
          </div>
          <div className="demo-hero__actions">
            <a className="demo-hero__cta demo-hero__cta--primary" href="#button">
              Explorar componentes <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="demo-hero__cta demo-hero__cta--secondary" href="#hooks">
              Ver hooks y utilidades <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="demo-hero__preview">
          <div className="demo-hero__metric-grid">
            <div className="demo-hero__metric-card">
              <span className="demo-hero__metric-label">Visual language</span>
              <strong className="demo-hero__metric-value">Premium UI/UX</strong>
              <p className="demo-hero__metric-copy">Jerarquía, profundidad, contraste y ritmo para que el demo venda mejor el sistema.</p>
            </div>
            <div className="demo-hero__metric-card">
              <span className="demo-hero__metric-label">Surface demos</span>
              <strong className="demo-hero__metric-value">23</strong>
              <p className="demo-hero__metric-copy">componentes visibles en navegación</p>
            </div>
            <div className="demo-hero__metric-card">
              <span className="demo-hero__metric-label">States</span>
              <strong className="demo-hero__metric-value">Rich</strong>
              <p className="demo-hero__metric-copy">loading, empty, interactive, responsive</p>
            </div>
            <div className="demo-hero__metric-card">
              <span className="demo-hero__metric-label">Experience</span>
              <strong className="demo-hero__metric-value">Live</strong>
              <p className="demo-hero__metric-copy">tema, navegación y examples listos para explorar</p>
            </div>
          </div>
        </div>
      </section>

      <TokensSection />
      <ButtonSection />
      <BadgeSection />
      <InputSection />
      <LabelSection />
      <SpinnerSection />
      <ProgressBarSection />
      <CardSection />
      <AlertSection />
      <AvatarSection />
      <ToggleSection />
      <ModalSection />
      <DataTableSection />
      <TableSection />
      <EmptyStateSection />
      <StatCardSection />
      <StepperSection />
      <TabsSection />
      <HeaderSection />
      <SidebarSection />
      <TooltipSection />
      <SkeletonSection />
      <SelectSection />
      <BreadcrumbSection />
      <HooksSection />
    </>
  )
}
