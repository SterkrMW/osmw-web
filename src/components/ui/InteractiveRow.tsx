import React from 'react';

interface InteractiveRowProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'compact' | 'bordered';
  hover?: boolean;
}

export default function InteractiveRow({
  children,
  onClick,
  className = '',
  variant = 'default',
  hover = true
}: InteractiveRowProps) {
  const baseClasses = "group rounded-lg transition-all duration-300";
  
  const variantClasses = {
    default: "bg-gradient-to-r from-background-tertiary/80 to-background-secondary/60 p-3 border border-border",
    compact: "bg-gradient-to-r from-background-tertiary/80 to-background-secondary/60 p-2 border border-border",
    bordered: "bg-gradient-to-r from-background-tertiary/80 to-background-secondary/60 p-4 border border-border"
  };
  
  const hoverClasses = hover 
    ? "hover:border-accent-primary hover:from-background-tertiary hover:to-background-secondary hover:scale-[1.01] hover:shadow-lg cursor-pointer" 
    : "";
    
  const clickableClasses = onClick ? "cursor-pointer" : "";
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClasses} ${className}`;
  
  return (
    <div className={combinedClasses} onClick={onClick}>
      {children}
    </div>
  );
}