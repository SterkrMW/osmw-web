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
  const baseClasses = "relative bg-gradient-to-br from-background-secondary to-background-tertiary backdrop-blur-xl rounded-2xl border border-border overflow-hidden shadow-card";
  
  const variantClasses = {
    default: "",
    compact: "rounded-card",
    fullHeight: "h-full"
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={combinedClasses}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-transparent to-accent-primary/5"></div>
      
      <div className="relative z-10">
        {title && (
          <div className="p-5 border-b border-border bg-gradient-to-r from-accent-primary/10 to-accent-secondary/8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent flex items-center gap-2">
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