'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'getting-started' | 'gameplay' | 'technical' | 'account';
}

const faqData: FAQItem[] = [
  {
    question: "How do I create an account?",
    answer: "Click the Register button in the top-right corner, fill out the form with your desired username, email, and password.",
    category: "getting-started"
  },
  {
    question: "What are the server rates?",
    answer: "Our server features vanilla 1x rates for EXP, drops, pet EXP, and gold - providing the authentic Myth War experience as originally intended.",
    category: "gameplay"
  },
  {
    question: "How do I download and install the game client?",
    answer: "Click the Download Client button, extract the files to a folder, run the patcher to update, then launch OSMW.exe. Make sure to register an account first.",
    category: "technical"
  },
  {
    question: "Can I play with multiple characters?",
    answer: "Yes! You can create up to 5 characters per account. You can use multiple characters from the same account at a time.",
    category: "account"
  },
  {
    question: "What is the maximum level?",
    answer: "Before Rebirth, the maximum level is 104. After Rebirth, the maximum level is 124.",
    category: "gameplay"
  },
  {
    question: "The game won't start or crashes. What should I do?",
    answer: "Make sure you have the latest client version, run as administrator, disable antivirus temporarily during installation, and check that Windows Defender isn't blocking the game files.",
    category: "technical"
  },
  {
    question: "Are there GMs online to help players?",
    answer: "Yes!",
    category: "getting-started"
  }
];

export const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const categories = [
    { key: 'all', label: 'All', icon: '📋' },
    { key: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { key: 'gameplay', label: 'Gameplay', icon: '⚔️' },
    { key: 'technical', label: 'Technical', icon: '🔧' },
    { key: 'account', label: 'Account', icon: '👤' }
  ];

  const filteredFAQ = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  return (
    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/30 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5"></div>
      <div className="relative z-10">
        <div className="p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-400/8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent flex items-center gap-2">
            ❓ Frequently Asked Questions
          </h2>
        </div>
        
        <div className="p-5">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
                  activeCategory === category.key
                    ? 'bg-cyan-500/30 text-cyan-100 border border-cyan-400/40'
                    : 'bg-slate-700/40 text-cyan-100/70 border border-cyan-500/20 hover:bg-slate-700/60'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-2">
            {filteredFAQ.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-slate-700/40 to-slate-600/20 rounded-lg border border-cyan-500/20 overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-3 text-left flex items-center justify-between hover:bg-slate-700/30 transition-all duration-300"
                >
                  <span className="text-cyan-100 font-medium text-sm pr-2">{item.question}</span>
                  <span className={`text-cyan-400 text-lg transition-transform duration-300 ${
                    openItems.includes(index) ? 'rotate-45' : ''
                  }`}>+</span>
                </button>
                {openItems.includes(index) && (
                  <div className="px-3 pb-3 border-t border-cyan-500/20">
                    <p className="text-cyan-100/80 text-xs leading-relaxed pt-2">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};