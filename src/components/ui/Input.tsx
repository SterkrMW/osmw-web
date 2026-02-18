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
  const baseStyles = 'w-full px-3 py-2 rounded transition-colors duration-200 focus:outline-none';
  
  const variantStyles = {
    default: `border shadow-sm bg-white/90 dark:bg-background-tertiary text-foreground-primary
      ${error 
        ? 'border-status-error focus:ring-2 focus:ring-status-error focus:border-status-error' 
        : 'border-gray-300 dark:border-border focus:ring-2 focus:ring-accent-primary focus:border-accent-primary'}`,
    dark: `bg-background-tertiary text-foreground-primary placeholder-foreground-secondary
      ${error
        ? 'border border-status-error focus:border-status-error'
        : 'border border-border focus:border-accent-primary focus:outline-accent-primary'}`
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
          variant === 'default' ? 'text-gray-700 dark:text-foreground-primary' : 'text-foreground-accent'
        }`}>
          {label}
        </label>
      )}
      {inputElement}
      {typeof error === 'string' && error && (
        <p className={`text-sm ${
          variant === 'default' ? 'text-red-600 dark:text-status-error' : 'text-status-error'
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