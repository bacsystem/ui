import { TokensSection } from './sections/TokensSection'
import { ButtonSection } from './sections/ButtonSection'
import { BadgeSection } from './sections/BadgeSection'
import { InputSection } from './sections/InputSection'
import { CardSection } from './sections/CardSection'
import { AlertSection } from './sections/AlertSection'
import { AvatarSection } from './sections/AvatarSection'
import { ToggleSection } from './sections/ToggleSection'
import { ModalSection } from './sections/ModalSection'
import { DataTableSection } from './sections/DataTableSection'
import { StatCardSection } from './sections/StatCardSection'
import { TabsSection } from './sections/TabsSection'
import { TooltipSection } from './sections/TooltipSection'
import { SkeletonSection } from './sections/SkeletonSection'
import { SelectSection } from './sections/SelectSection'
import { BreadcrumbSection } from './sections/BreadcrumbSection'
import { HooksSection } from './sections/HooksSection'

/**
 * Renders the demo page composed of the library's UI section components.
 *
 * @returns A React fragment containing the page sections in order: TokensSection, ButtonSection, BadgeSection, InputSection, CardSection, AlertSection, AvatarSection, ToggleSection, ModalSection, DataTableSection, StatCardSection, TabsSection, and HooksSection.
 */
export default function Home() {
  return (
    <>
      <TokensSection />
      <ButtonSection />
      <BadgeSection />
      <InputSection />
      <CardSection />
      <AlertSection />
      <AvatarSection />
      <ToggleSection />
      <ModalSection />
      <DataTableSection />
      <StatCardSection />
      <TabsSection />
      <TooltipSection />
      <SkeletonSection />
      <SelectSection />
      <BreadcrumbSection />
      <HooksSection />
    </>
  )
}
