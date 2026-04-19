import { useCallback, useState } from 'react'

export interface UseControllableStateOptions<T> {
  readonly value?: T
  readonly defaultValue: T
  readonly onChange?: (nextValue: T) => void
}

export interface UseControllableStateResult<T> {
  readonly value: T
  readonly setValue: (nextValue: T | ((previousValue: T) => T)) => void
  readonly isControlled: boolean
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): UseControllableStateResult<T> {
  const [internalValue, setInternalValue] = useState<T>(defaultValue)
  const isControlled = value !== undefined
  const resolvedValue = isControlled ? value : internalValue

  const setValue = useCallback((nextValue: T | ((previousValue: T) => T)) => {
    const computedValue = typeof nextValue === 'function'
      ? (nextValue as (previousValue: T) => T)(resolvedValue)
      : nextValue

    if (!isControlled) {
      setInternalValue(computedValue)
    }

    onChange?.(computedValue)
  }, [isControlled, onChange, resolvedValue])

  return {
    value: resolvedValue,
    setValue,
    isControlled,
  }
}