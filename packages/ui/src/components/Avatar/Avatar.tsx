import { useState, useEffect } from 'react'
import { User } from 'lucide-react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarAppearance = 'soft' | 'filled' | 'outline'

export interface AvatarProps {
  readonly src?: string
  readonly alt?: string
  readonly initials?: string
  readonly size?: AvatarSize
  readonly appearance?: AvatarAppearance
  readonly className?: string
}

/**
 * Render an avatar element that displays an image, initials, or a fallback icon based on provided props.
 *
 * @param src - Optional URL of the avatar image
 * @param alt - Alternative text for the image; also used for the wrapper's accessible label when present
 * @param initials - Text to display when the image is not shown
 * @param size - Visual size of the avatar (`'xs' | 'sm' | 'md' | 'lg' | 'xl'`)
 * @param appearance - Visual style of the avatar (`'soft' | 'filled' | 'outline'`)
 * @param className - Additional CSS classes to apply to the root element
 * @returns A span element containing the avatar image if available, otherwise initials or a fallback icon
 */
export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  appearance = 'soft',
  className = '',
}: Readonly<AvatarProps>) {
  const [imgError, setImgError] = useState(false)

  // Reset error state whenever src changes so a new image gets a fresh attempt
  useEffect(() => {
    setImgError(false)
  }, [src])

  const showImage = src && !imgError
  const showInitials = !showImage && initials
  const showFallback = !showImage && !showInitials
  const appearanceClass = appearance === 'soft' ? '' : ` bac-avatar--${appearance}`
  const extraClass = className ? ` ${className}` : ''
  const avatarClass = `bac-avatar bac-avatar--${size}${appearanceClass}${extraClass}`

  if (showImage) {
    return (
      <span className={avatarClass}>
        <img
          src={src}
          alt={alt}
          className="bac-avatar__img"
          onError={() => setImgError(true)}
        />
      </span>
    )
  }

  const fallbackLabel = initials || alt || 'Avatar'

  return (
    <span
      role="img"
      aria-label={fallbackLabel}
      className={avatarClass}
    >
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
