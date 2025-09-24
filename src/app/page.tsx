import React from 'react';
import { NewsSection } from '@/components/home/NewsSection';
import { FeatureHighlights } from '@/components/home/FeatureHighlights';
import { PatchNotes } from '@/components/home/PatchNotes';
import { EventCalendar } from '@/components/home/EventCalendar';
import { FAQ } from '@/components/home/FAQ';
import { PageContainer } from '@/components/ui';

export default function Home() {
  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Feature Highlights - Top Banner */}
        <FeatureHighlights />
        
        {/* News Section - Full Width */}
        <NewsSection />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Event Calendar */}
          <div className="w-full">
            <EventCalendar />
          </div>
          
          {/* Patch Notes */}
          <div className="w-full">
            <PatchNotes />
          </div>
        </div>
        
        {/* FAQ - Full Width Bottom */}
        <FAQ />
      </div>
    </PageContainer>
  );
}
