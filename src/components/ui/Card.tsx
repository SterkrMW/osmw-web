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
  const baseStyles = 'rounded-xl shadow-lg transition-all duration-300 overflow-hidden';
  
  const variantStyles = {
    default: 'bg-white/90 border border-gray-200 hover:shadow-xl',
    fantasy: `bg-gradient-to-br from-amber-50/90 to-orange-50/90 
      border border-amber-300 hover:shadow-2xl hover:shadow-amber-500/20
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-br 
      before:from-amber-100/50 before:to-transparent before:pointer-events-none`,
    dark: `bg-gradient-to-br from-gray-800/90 to-gray-900/90 
      border border-gray-700 text-white hover:shadow-2xl hover:shadow-blue-500/20`,
    glass: 'relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-cyan-400/30 shadow-2xl'
  };

  const isCompact = size === 'compact';
  const isGlass = variant === 'glass';

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {/* Glass card gradient overlay */}
      {isGlass && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5 rounded-xl pointer-events-none"></div>
      )}
      
      {/* Header section */}
      {title && (
        <div className={`relative ${isCompact ? 'p-4' : 'p-5'} border-b ${
          isGlass ? 'border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8' : 'border-gray-200 dark:border-gray-700'
        } ${headerClassName}`}>
          <h2 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold ${
            isGlass ? 'bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent' : ''
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