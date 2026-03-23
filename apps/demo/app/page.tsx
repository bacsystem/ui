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
import { HooksSection } from './sections/HooksSection'

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
      <HooksSection />
    </>
  )
}
