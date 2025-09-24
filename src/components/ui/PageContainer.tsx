import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
  className?: string;
  centerContent?: boolean;
}

export default function PageContainer({
  children,
  maxWidth = '7xl',
  className = '',
  centerContent = false
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg', 
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  };
  
  const centerClasses = centerContent ? 'flex items-center justify-center' : '';
  
  return (
    <div className={`min-h-screen px-6 py-8 ${centerClasses} ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto w-full`}>
        {children}
      </div>
    </div>
  );
}