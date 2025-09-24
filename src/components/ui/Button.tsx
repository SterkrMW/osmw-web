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
    font-bold rounded-xl transition-all duration-300 
    shadow-lg hover:shadow-xl hover:scale-105
    disabled:opacity-50 disabled:cursor-not-allowed 
    disabled:hover:scale-100 relative overflow-hidden
    inline-flex items-center justify-center
  `;

  const variantStyles = {
    // Original GradientButton variants - matching site theme
    primary: 'bg-gradient-to-r from-cyan-500/80 to-teal-600/80 hover:from-cyan-500 hover:to-teal-600 text-white',
    secondary: 'bg-gradient-to-r from-slate-700/40 to-slate-600/20 hover:from-slate-700/60 hover:to-slate-600/40 text-cyan-100 border border-cyan-500/20 hover:border-cyan-400/40',
    outline: 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10',
    
    // Original Button variants
    danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-2 border-red-500',
    fantasy: `bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 
      hover:from-amber-700 hover:via-amber-800 hover:to-amber-900
      text-amber-100 border-2 border-amber-500 font-bold tracking-wide
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-transparent before:via-amber-400/20 before:to-transparent
      before:translate-x-[-100%] hover:before:translate-x-[100%] 
      before:transition-transform before:duration-700`,
    
    // Additional gradient variants for site theme
    'gradient-purple': 'bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-500 hover:to-purple-600 text-white',
    'gradient-cyan': 'bg-gradient-to-r from-cyan-500/80 to-teal-600/80 hover:from-cyan-500 hover:to-teal-600 text-white'
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