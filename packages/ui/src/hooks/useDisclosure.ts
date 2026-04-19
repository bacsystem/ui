import { useCallback } from 'react'
import { useControllableState } from './useControllableState'

export interface UseDisclosureOptions {
  readonly open?: boolean
  readonly defaultOpen?: boolean
  readonly onOpenChange?: (open: boolean) => void
}

export interface UseDisclosureResult {
  readonly open: boolean
  readonly setOpen: (open: boolean | ((previousOpen: boolean) => boolean)) => void
  readonly onOpen: () => void
  readonly onClose: () => void
  readonly onToggle: () => void
}

export function useDisclosure({
  open,
  defaultOpen = false,
  onOpenChange,
}: UseDisclosureOptions = {}): UseDisclosureResult {
  const state = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const onOpen = useCallback(() => state.setValue(true), [state])
  const onClose = useCallback(() => state.setValue(false), [state])
  const onToggle = useCallback(() => state.setValue((previousOpen) => !previousOpen), [state])

  return {
    open: state.value,
    setOpen: state.setValue,
    onOpen,
    onClose,
    onToggle,
  }
}