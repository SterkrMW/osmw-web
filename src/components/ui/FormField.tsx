import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
}

export default function FormField({
  label,
  required = false,
  error,
  children,
  className = '',
  labelClassName = ''
}: FormFieldProps) {
  return (
    <div className={className}>
      <label className={`block text-foreground-accent text-sm font-semibold mb-2 ${labelClassName}`}>
        {label}
        {required && <span className="text-status-error ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-sm text-status-error">
          {error}
        </p>
      )}
    </div>
  );
}