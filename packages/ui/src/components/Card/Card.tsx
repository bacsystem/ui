export type CardVariant = 'default' | 'elevated' | 'outlined' | 'tinted'
export type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  size?: CardSize
  className?: string
  children: React.ReactNode
}

export function Card({ variant = 'default', size = 'md', className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={`bac-card bac-card--${variant} bac-card--${size}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {children}
    </div>
  )
}
