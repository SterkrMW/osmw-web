'use client';

import React from 'react';
import { SERVER_CONFIG } from '@/config/constants';

interface PatchNote {
  version: string;
  date: string;
  changes: string[];
  type: 'major' | 'minor' | 'hotfix';
}

const patchNotes: PatchNote[] = [
  // {
  //   version: SERVER_CONFIG.serverVersion,
  //   date: "Sep 9, 2025",
  //   changes: [
  //     "Added Christmas event with exclusive rewards",
  //     "Fixed critical PvP desync issue",
  //     "Balanced Mage fire spells damage",
  //     "Added 3 new holiday pets"
  //   ],
  //   type: "major"
  // },
  // {
  //   version: "v2.1.7",
  //   date: "Sep 9, 2025", 
  //   changes: [
  //     "Server stability improvements",
  //     "Fixed item duplication exploit",
  //     "Adjusted Borg skill cooldowns",
  //     "Enhanced server monitoring"
  //   ],
  //   type: "hotfix"
  // },
  // {
  //   version: "v2.1.6",
  //   date: "Sep 9, 2025",
  //   changes: [
  //     "Guild War Tournament system implemented",
  //     "New Crystal Fields map added",
  //     "Pet evolution system released",
  //     "Enhanced PvP ranking rewards"
  //   ],
  //   type: "major"
  // }
];

export const PatchNotes: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/30 overflow-hidden shadow-2xl h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5"></div>
      <div className="relative z-10 h-full flex flex-col">
        <div className="p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent flex items-center gap-2">
            📋 Patch Notes
          </h2>
        </div>
        <div className="p-5 space-y-3 flex-1">
          {patchNotes.map((patch, index) => (
            <div key={index} className="group bg-gradient-to-r from-slate-700/40 to-slate-600/20 rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-cyan-100 font-semibold text-sm">{patch.version}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded border font-medium ${
                    patch.type === 'major' ? 'bg-lime-500/20 text-lime-300 border-lime-500/30' :
                    patch.type === 'minor' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
                    'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>{patch.type.toUpperCase()}</span>
                </div>
                <span className="text-cyan-300/60 text-xs">{patch.date}</span>
              </div>
              <ul className="space-y-1">
                {patch.changes.map((change, i) => (
                  <li key={i} className="text-cyan-100/80 text-xs flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};