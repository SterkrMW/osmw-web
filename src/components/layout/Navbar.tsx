'use client';

import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="relative bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-cyan-400/30 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="OSMW" 
              className="h-12 w-auto drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-cyan-100/90 hover:text-cyan-50 hover:bg-slate-700/50 rounded-xl text-sm font-semibold transition-all duration-300">
              Home
            </Link>
            <Link href="/download" className="px-4 py-2 text-cyan-100/90 hover:text-cyan-50 hover:bg-slate-700/50 rounded-xl text-sm font-semibold transition-all duration-300">
              Download
            </Link>
            <Link href="/guides" className="px-4 py-2 text-cyan-100/90 hover:text-cyan-50 hover:bg-slate-700/50 rounded-xl text-sm font-semibold transition-all duration-300">
              Guides
            </Link>
            <Link href="/rankings" className="px-4 py-2 text-cyan-100/90 hover:text-cyan-50 hover:bg-slate-700/50 rounded-xl text-sm font-semibold transition-all duration-300">
              Rankings
            </Link>
            <div className="ml-6 flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 text-cyan-100/90 hover:text-cyan-50 hover:bg-slate-700/50 rounded-xl text-sm font-semibold transition-all duration-300 border border-cyan-500/30 hover:border-cyan-400/40">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-cyan-500/80 to-teal-500/80 hover:from-cyan-500 hover:to-teal-500 text-white hover:text-cyan-50 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-cyan-500/30 border border-cyan-400/30">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};