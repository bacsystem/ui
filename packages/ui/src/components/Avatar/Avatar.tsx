import { useState, useEffect } from 'react'
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
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  // Reset error state whenever src changes so a new image gets a fresh attempt
  useEffect(() => {
    setImgError(false)
  }, [src])

  const showImage = src && !imgError
  const showInitials = !showImage && initials
  const showFallback = !showImage && !showInitials
  const appearanceClass = appearance === 'soft' ? '' : ` bac-avatar--${appearance}`

  return (
    <span
      role="img"
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
