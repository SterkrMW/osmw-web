'use client';

import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

const features: Feature[] = [
  {
    icon: "⚔️",
    title: "Turn-Based Combat",
    description: "Classic Active Time Battle system inspired by iconic RPGs",
    highlight: "1x Vanilla Rates"
  },
  {
    icon: "🏹",
    title: "Four Unique Races",
    description: "Play as either Humans, Centaurs, Mages, or Borgs",
    highlight: "Balanced Classes"
  },
  {
    icon: "🐲",
    title: "100+ Trainable Pets",
    description: "Hatch from eggs and train them to fight alongside you",
    highlight: "Pet System"
  },
  {
    icon: "🎓",
    title: "Help Newbie",
    description: "Mentorship system connecting veterans with new players",
    highlight: "Social Feature"
  },
  {
    icon: "💬",
    title: "Rumor System",
    description: "Spread tales and interact through unique social mechanics",
    highlight: "Community"
  },
  {
    icon: "💎",
    title: "Player Rebirth",
    description: "Change your race, gender, and gain new skills and bonuses",
    highlight: "Endgame Content"
  }
];

export const FeatureHighlights: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/30 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5"></div>
      <div className="relative z-10">
        <div className="p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent flex items-center gap-2">
            ✨ Server Features
          </h2>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="group bg-gradient-to-r from-slate-700/40 to-slate-600/20 rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-700/60 hover:to-slate-600/40 hover:scale-105">
              <div className="flex items-start gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                <div className="flex-1">
                  <h3 className="text-cyan-100 font-semibold text-sm group-hover:text-cyan-50 transition-colors mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-cyan-100/70 text-xs leading-tight mb-2">
                    {feature.description}
                  </p>
                  <span className="inline-block px-2 py-1 bg-lime-500/20 text-lime-300 border border-lime-500/30 rounded text-xs font-bold">
                    {feature.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};