'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlassCard, GradientButton, StatusBadge, InteractiveRow, PageContainer, BackToHomepage, MainContainer } from '@/components/ui';

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const guides = [
    {
      id: 1,
      title: 'Getting Started - New Player Guide',
      description: 'Essential guide to Mythwar\'s turn-based combat, races, pet system, and unique community features.',
      category: 'Beginner',
      views: 15420,
      lastUpdated: 'Sep 9, 2025',
      difficulty: 'Easy',
      icon: '🎮'
    },
    {
      id: 2,
      title: 'Character Races & Combat Styles',
      description: 'Complete guide to the four races: Humans, Centaurs, Mages, and Borgs with their unique combat abilities.',
      category: 'Character',
      views: 12350,
      lastUpdated: 'Sep 9, 2025',
      difficulty: 'Medium',
      icon: '⚔️'
    },
    {
      id: 3,
      title: 'Pet System Guide',
      description: 'Learn to find, tame, and train creature companions to fight alongside you in turn-based combat.',
      category: 'Pets',
      views: 8920,
      lastUpdated: 'Sep 9, 2025',
      difficulty: 'Medium',
      icon: '🐲'
    },
    {
      id: 4,
      title: 'Rumor System & Communication',
      description: 'Understand Mythwar\'s unique information network that connects players through shared knowledge.',
      category: 'Social',
      views: 6780,
      lastUpdated: 'Sep 9, 2025',
      difficulty: 'Easy',
      icon: '💬'
    },
    {
      id: 5,
      title: 'Master & Apprentice System',
      description: 'Learn about the mentorship system that connects veteran players with newcomers.',
      category: 'Social',
      views: 5430,
      lastUpdated: 'Sep 9, 2025',
      difficulty: 'Easy',
      icon: '🎓'
    },
    {
      id: 6,
      title: 'Turn-Based Combat System',
      description: 'Master Mythwar\'s strategic turn-based combat system and tactical gameplay elements.',
      category: 'Combat',
      views: 9120,
      lastUpdated: 'Sep 9, 2025',
      difficulty: 'Medium',
      icon: '⚔️'
    }
  ];

  const categories = ['All', 'Beginner', 'Character', 'Pets', 'Social', 'Combat'];

  const filteredGuides = selectedCategory === 'All' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Category Filter */}
        <GlassCard title="📚 Player Guides" variant="compact">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                  category === selectedCategory
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-slate-700 text-cyan-100 hover:bg-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Guides List */}
        <MainContainer title="📋 Available Guides">
          <div className="space-y-4">
            {filteredGuides.map((guide) => (
              <InteractiveRow key={guide.id} variant="bordered">
                <div className="flex items-start gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {guide.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-cyan-100 group-hover:text-cyan-300 transition-colors">
                        {guide.title}
                      </h3>
                      <StatusBadge type={guide.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}>
                        {guide.difficulty}
                      </StatusBadge>
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      {guide.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <StatusBadge type={guide.category.toLowerCase() as 'beginner' | 'character' | 'pets' | 'social' | 'combat'}>
                          {guide.category}
                        </StatusBadge>
                        <span>📅 {guide.lastUpdated}</span>
                      </div>
                      <Link href={`/guides/${guide.id}`}>
                        <GradientButton variant="primary">
                          Read Guide →
                        </GradientButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </InteractiveRow>
            ))}
          </div>
        </MainContainer>

        <div className="text-center">
          <BackToHomepage />
        </div>
      </div>
    </PageContainer>
  );
}