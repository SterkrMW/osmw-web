import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'fantasy' | 'dark' | 'glass';
  title?: string;
  icon?: string;
  size?: 'default' | 'compact';
  headerClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export default function Card({
  variant = 'default',
  size = 'default',
  title,
  icon,
  className = '',
  headerClassName = '',
  contentClassName = '',
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded shadow-lg transition-all duration-300 overflow-hidden';
  
  const variantStyles = {
    default: 'bg-white/90 border border-gray-200 hover:shadow-xl',
    fantasy: `bg-gradient-to-br from-amber-50/90 to-orange-50/90 
      border border-amber-300 hover:shadow-2xl hover:shadow-amber-500/20
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-br 
      before:from-amber-100/50 before:to-transparent before:pointer-events-none`,
    dark: `bg-gradient-to-br from-background-secondary to-background-tertiary 
      border border-border text-foreground-primary hover:shadow-2xl hover:shadow-accent-glow`,
    glass: 'relative bg-gradient-to-br from-background-secondary to-background-tertiary backdrop-blur-xl border border-border shadow-card'
  };

  const isCompact = size === 'compact';
  const isGlass = variant === 'glass';

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {/* Glass card gradient overlay */}
      {isGlass && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-transparent to-accent-primary/5 rounded pointer-events-none"></div>
      )}
      
      {/* Header section */}
      {title && (
        <div className={`relative ${isCompact ? 'p-4' : 'p-5'} border-b ${
          isGlass ? 'border-border bg-gradient-to-r from-accent-primary/10 to-accent-secondary/8' : 'border-gray-200 dark:border-gray-700'
        } ${headerClassName}`}>
          <h2 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold ${
            isGlass ? 'bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent' : ''
          } flex items-center gap-2`}>
            {icon && <span>{icon}</span>}
            {title}
          </h2>
        </div>
      )}
      
      {/* Content section */}
      <div className={`relative z-10 ${isCompact ? 'p-4' : 'p-5'} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}

// Export preset components for backward compatibility
export const GlassCard = ({ variant = 'compact', ...props }: Omit<CardProps, 'variant'> & { variant?: 'default' | 'compact' }) => (
  <Card {...props} variant="glass" size={variant} />
);