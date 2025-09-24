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
    default: "bg-gradient-to-r from-slate-700/40 to-slate-600/20 p-3 border border-cyan-500/20",
    compact: "bg-gradient-to-r from-slate-700/40 to-slate-600/20 p-2 border border-cyan-500/20",
    bordered: "bg-gradient-to-r from-slate-700/40 to-slate-600/20 p-4 border border-cyan-500/20"
  };
  
  const hoverClasses = hover 
    ? "hover:border-cyan-400/40 hover:bg-gradient-to-r hover:from-slate-700/60 hover:to-slate-600/40 hover:scale-[1.01] hover:shadow-lg cursor-pointer" 
    : "";
    
  const clickableClasses = onClick ? "cursor-pointer" : "";
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClasses} ${className}`;
  
  return (
    <div className={combinedClasses} onClick={onClick}>
      {children}
    </div>
  );
}