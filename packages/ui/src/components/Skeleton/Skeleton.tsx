'use client'

import type { CSSProperties } from 'react'

export type SkeletonVariant = 'text' | 'circle' | 'rect'

export interface SkeletonProps {
  readonly variant?: SkeletonVariant
  readonly width?: string | number
  readonly height?: string | number
  readonly className?: string
}

export function Skeleton({
  variant = 'rect',
  width,
  height,
  className = '',
}: SkeletonProps) {
  const style: CSSProperties = {}
  if (width !== undefined) style.width = typeof width === 'number' ? `${width}px` : width
  if (height !== undefined) style.height = typeof height === 'number' ? `${height}px` : height

  const classes = [
    'bac-skeleton',
    `bac-skeleton--${variant}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <span
      className={classes}
      style={style}
      aria-hidden="true"
    />
  )
}

Skeleton.displayName = 'Skeleton'
