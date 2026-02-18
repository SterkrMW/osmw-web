import React from 'react';
import Link from 'next/link';

interface BackLinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered';
}

export default function BackLink({ 
  href = '/', 
  children = '← Back to Homepage',
  className = '',
  variant = 'default'
}: BackLinkProps) {
  const linkElement = (
    <Link 
      href={href} 
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-background-secondary to-background-tertiary hover:opacity-90 text-foreground-primary hover:text-foreground-accent rounded transition-all duration-300 border border-border hover:border-accent-primary text-sm ${className}`}
    >
      {children}
    </Link>
  );

  if (variant === 'centered') {
    return (
      <div className={`text-center ${className}`}>
        {linkElement}
      </div>
    );
  }

  return linkElement;
}

// Export a preset for common "Back to Homepage" usage
export const BackToHomepage = ({ className = '' }: { className?: string }) => (
  <BackLink variant="centered" className={className}>
    ← Back to Homepage
  </BackLink>
);