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
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800/80 to-slate-900/90 hover:from-slate-700/60 hover:to-slate-600/40 text-cyan-100/90 hover:text-cyan-50 rounded-lg transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400/40 text-sm ${className}`}
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