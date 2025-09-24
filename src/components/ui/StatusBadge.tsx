import React from 'react';

interface StatusBadgeProps {
  type: 'event' | 'update' | 'tournament' | 'feature' | 'pvp' | 'pve' | 'special' | 'easy' | 'medium' | 'hard' | 'patch' | 'hotfix' | 'beginner' | 'character' | 'pets' | 'social' | 'combat';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StatusBadge({ 
  type, 
  children, 
  size = 'sm',
  className = ''
}: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };
  
  const typeClasses = {
    // Event and news types
    event: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
    update: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    tournament: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    feature: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    special: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    
    // Combat/PvP types
    pvp: 'bg-red-500/20 text-red-300 border-red-500/30',
    pve: 'bg-green-500/20 text-green-300 border-green-500/30',
    
    // Difficulty levels
    easy: 'bg-green-500/20 text-green-300 border-green-500/30',
    medium: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    hard: 'bg-red-500/20 text-red-300 border-red-500/30',
    
    // Patch types
    patch: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    hotfix: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    
    // Guide categories
    beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
    character: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    pets: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    social: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    combat: 'bg-red-500/20 text-red-300 border-red-500/30'
  };
  
  const baseClasses = "rounded border font-medium inline-flex items-center justify-center";
  
  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${typeClasses[type]} ${className}`}>
      {children}
    </span>
  );
}