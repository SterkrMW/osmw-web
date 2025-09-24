'use client';

import React from 'react';

interface GameEvent {
  name: string;
  time: string;
  day: string;
  description: string;
  type: 'pvp' | 'pve' | 'special' | 'daily';
  active?: boolean;
}

const events: GameEvent[] = [
  // {
  //   name: "Guild Wars",
  //   time: "01:00 UTC",
  //   day: "Saturday",
  //   description: "Epic guild battles for territory control",
  //   type: "pvp"
  // },
  // {
  //   name: "Boss Hunt",
  //   time: "00:00 UTC", 
  //   day: "Sunday",
  //   description: "Server-wide boss raid with rare rewards",
  //   type: "pve"
  // },
  // {
  //   name: "Double EXP",
  //   time: "All Day",
  //   day: "Friday",
  //   description: "2x experience points for faster leveling",
  //   type: "special",
  //   active: true
  // },
  // {
  //   name: "PvP Tournament",
  //   time: "02:00 UTC",
  //   day: "Wednesday",
  //   description: "1v1 brackets with championship prizes",
  //   type: "pvp"
  // },
  // {
  //   name: "Christmas Event",
  //   time: "23:00 UTC",
  //   day: "Daily",
  //   description: "Holiday quests and exclusive rewards",
  //   type: "special",
  //   active: true
  // }
];

export const EventCalendar: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/30 overflow-hidden shadow-2xl h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5"></div>
      <div className="relative z-10 h-full flex flex-col">
        <div className="p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent flex items-center gap-2">
            📅 Event Calendar
          </h2>
        </div>
        <div className="p-5 space-y-2 flex-1">
          {events.map((event, index) => (
            <div key={index} className={`group bg-gradient-to-r from-slate-700/40 to-slate-600/20 rounded-lg p-3 border transition-all duration-300 hover:scale-[1.02] ${
              event.active ? 'border-lime-500/40 bg-gradient-to-r from-lime-900/20 to-lime-800/10' : 'border-cyan-500/20 hover:border-cyan-400/40'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-cyan-100 font-semibold text-sm">{event.name}</h3>
                  {event.active && (
                    <span className="text-xs px-2 py-0.5 bg-lime-500/20 text-lime-300 border border-lime-500/30 rounded font-medium animate-pulse">
                      LIVE
                    </span>
                  )}
                  <span className={`text-xs px-1.5 py-0.5 rounded border font-medium ${
                    event.type === 'pvp' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                    event.type === 'pve' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                    event.type === 'special' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                    'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  }`}>{event.type.toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <div className="text-cyan-200 text-xs font-medium">{event.day}</div>
                  <div className="text-cyan-300/60 text-xs">{event.time}</div>
                </div>
              </div>
              <p className="text-cyan-100/70 text-xs">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};