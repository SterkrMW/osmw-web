import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'fantasy' | 'gradient-purple' | 'gradient-cyan';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    font-bold rounded transition-all duration-300 
    shadow-lg hover:shadow-xl hover:scale-105
    disabled:opacity-50 disabled:cursor-not-allowed 
    disabled:hover:scale-100 relative overflow-hidden
    inline-flex items-center justify-center
  `;

  const variantStyles = {
    // Site theme (synced with App.css)
    primary: 'bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 text-white',
    secondary: 'bg-gradient-to-r from-background-tertiary/80 to-background-secondary/60 hover:from-background-tertiary hover:to-background-secondary text-foreground-primary border border-border hover:border-accent-primary',
    outline: 'bg-transparent border-2 border-accent-primary text-accent-primary hover:bg-accent-primary/10',
    
    danger: 'bg-gradient-to-r from-status-error to-red-700 hover:opacity-90 text-white border-2 border-status-error',
    fantasy: `bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 
      hover:from-amber-700 hover:via-amber-800 hover:to-amber-900
      text-amber-100 border-2 border-amber-500 font-bold tracking-wide
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-transparent before:via-amber-400/20 before:to-transparent
      before:translate-x-[-100%] hover:before:translate-x-[100%] 
      before:transition-transform before:duration-700`,
    
    'gradient-purple': 'bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-500 hover:to-purple-600 text-white',
    'gradient-cyan': 'bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 text-white'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Export preset components for common use cases
export const GradientButton = (props: ButtonProps) => <Button variant="primary" {...props} />;