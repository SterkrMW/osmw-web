import React from 'react';

interface MainContainerProps {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'fullHeight';
}

export default function MainContainer({
  children,
  title,
  icon,
  className = '',
  variant = 'default'
}: MainContainerProps) {
  const baseClasses = "relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/30 overflow-hidden shadow-2xl";
  
  const variantClasses = {
    default: "",
    compact: "rounded-xl",
    fullHeight: "h-full"
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={combinedClasses}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5"></div>
      
      <div className="relative z-10">
        {title && (
          <div className="p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent flex items-center gap-2">
              {icon && <span>{icon}</span>}
              {title}
            </h2>
          </div>
        )}
        
        <div className={title ? "p-5" : "p-6"}>
          {children}
        </div>
      </div>
    </div>
  );
}