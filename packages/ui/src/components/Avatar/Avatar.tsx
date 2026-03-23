import { useState } from 'react'
import { User } from 'lucide-react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarAppearance = 'soft' | 'filled' | 'outline'

export interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: AvatarSize
  appearance?: AvatarAppearance
  className?: string
}

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  appearance = 'soft',
  className = '',
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  const showImage = src && !imgError
  const showInitials = !showImage && initials
  const showFallback = !showImage && !showInitials
  const appearanceClass = appearance === 'soft' ? '' : ` bac-avatar--${appearance}`

  return (
    <span
      className={`bac-avatar bac-avatar--${size}${appearanceClass}${className ? ` ${className}` : ''}`}
      aria-label={alt || initials}
    >
      {showImage && (
        <img
          src={src}
          alt={alt}
          className="bac-avatar__img"
          onError={() => setImgError(true)}
        />
      )}
      {showInitials && (
        <span className="bac-avatar__initials" aria-hidden="true">
          {initials}
        </span>
      )}
      {showFallback && (
        <User className="bac-avatar__icon" aria-hidden="true" />
      )}
    </span>
  )
}
