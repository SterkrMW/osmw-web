import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
  variant?: 'default' | 'dark';
}

export default function Input({
  label,
  error,
  variant = 'dark',
  className = '',
  ...props
}: InputProps) {
  const baseStyles = 'w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none';
  
  const variantStyles = {
    default: `border shadow-sm bg-white/90 dark:bg-gray-800/90 dark:text-white
      ${error 
        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'}`,
    dark: `bg-slate-800/50 text-cyan-100 placeholder-cyan-300/50
      ${error
        ? 'border border-red-500/50 focus:border-red-400'
        : 'border border-cyan-500/30 focus:border-cyan-400'}`
  };

  const inputElement = (
    <input
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );

  if (!label && typeof error !== 'string') {
    return inputElement;
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className={`block text-sm font-medium ${
          variant === 'default' ? 'text-gray-700 dark:text-gray-300' : 'text-cyan-200'
        }`}>
          {label}
        </label>
      )}
      {inputElement}
      {typeof error === 'string' && error && (
        <p className={`text-sm ${
          variant === 'default' ? 'text-red-600 dark:text-red-400' : 'text-red-400'
        }`}>
          {error}
        </p>
      )}
    </div>
  );
}

// Export preset for backward compatibility
export const FormInput = (props: Omit<InputProps, 'variant'>) => (
  <Input {...props} variant="dark" />
);