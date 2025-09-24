'use client';

import React, { useState } from 'react';

interface NewsItem {
  date: string;
  title: string;
  content: string;
  tag: string;
}

const newsData: NewsItem[] = [
  {
    date: "Sep 24, 2025",
    title: "Beta Begins!",
    content: "The beta begins! Join our Discord server to get the latest updates and download the client.",
    tag: "Update"
  },
  // {
  //   date: "Sep 9, 2025", 
  //   title: "🔧 Server Maintenance Complete",
  //   content: "Major server stability improvements and critical bug fixes. New Borg skills have been balanced for better PvP gameplay.",
  //   tag: "Update"
  // },
  // {
  //   date: "Sep 9, 2025",
  //   title: "⚔️ Guild War Tournament Season 3",
  //   content: "Weekly guild tournaments with amazing prizes including rare mounts and exclusive titles. Registration is now open!",
  //   tag: "Tournament"
  // },
  // {
  //   date: "Sep 9, 2025",
  //   title: "🐾 Pet System 2.0 Released",
  //   content: "Complete pet system overhaul with evolution mechanics, 15 new legendary pets, and improved AI combat systems.",
  //   tag: "Feature"
  // },
  // {
  //   date: "Sep 9, 2025",
  //   title: "🏰 New Map: Crystal Fields",
  //   content: "Explore the mysterious Crystal Fields with unique mechanics, rare loot drops, and challenging boss encounters.",
  //   tag: "Feature"
  // },
  // {
  //   date: "Sep 9, 2025",
  //   title: "⚡ Double EXP Weekend",
  //   content: "Enjoy double experience points all weekend long! Perfect time to level up your characters and try new builds.",
  //   tag: "Event"
  // },
  // {
  //   date: "Sep 9, 2025",
  //   title: "🛡️ PvP Balance Update",
  //   content: "Major balance changes to warrior and mage classes. See patch notes for detailed skill adjustments and improvements.",
  //   tag: "Update"
  // },
  // {
  //   date: "Sep 9, 2025",
  //   title: "🎃 Halloween Event Finale",
  //   content: "Last chance to collect Halloween rewards! Spooky bosses and exclusive cosmetics available until midnight.",
  //   tag: "Event"
  // }
];

export const NewsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);
  
  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return newsData.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/30 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5"></div>
      <div className="relative z-10">
        <div className="p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent flex items-center gap-2">
              📢 Latest News & Updates
            </h2>
            {totalPages > 1 && (
              <div className="text-cyan-300/60 text-sm">
                Page {currentPage + 1} of {totalPages}
              </div>
            )}
          </div>
        </div>
        <div className="p-5 space-y-1.5">
          {getCurrentItems().map((news, i) => (
            <div key={i} className="group bg-gradient-to-r from-slate-700/40 to-slate-600/20 rounded p-2.5 border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-gradient-to-r hover:from-slate-700/60 hover:to-slate-600/40 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-cyan-100 font-semibold text-sm group-hover:text-cyan-50 transition-colors">{news.title}</h3>
                  <span className={`text-xs px-1.5 py-0.5 rounded border font-medium ${
                    news.tag === 'Event' ? 'bg-lime-500/20 text-lime-300 border-lime-500/30' :
                    news.tag === 'Update' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
                    news.tag === 'Tournament' ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>{news.tag}</span>
                </div>
                <span className="text-cyan-300/60 text-xs font-medium">{news.date}</span>
              </div>
              <p className="text-cyan-100/80 text-xs leading-tight group-hover:text-cyan-100/90 transition-colors">{news.content}</p>
            </div>
          ))}
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-4 border-t border-cyan-500/20 mt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="px-3 py-1.5 text-xs bg-slate-700/40 text-cyan-100 rounded border border-cyan-500/20 hover:bg-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`px-2.5 py-1.5 text-xs rounded border transition-all duration-300 ${
                    currentPage === i
                      ? 'bg-cyan-500/30 text-cyan-100 border-cyan-400/40'
                      : 'bg-slate-700/40 text-cyan-100/70 border-cyan-500/20 hover:bg-slate-700/60'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1.5 text-xs bg-slate-700/40 text-cyan-100 rounded border border-cyan-500/20 hover:bg-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};