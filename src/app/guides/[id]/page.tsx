import { notFound } from 'next/navigation';
import { GlassCard, StatusBadge, BackLink, BackToHomepage, PageContainer } from '@/components/ui';
import { parseMarkdownSafe } from '@/lib/markdown';
import { Metadata } from 'next';
import { guideContent } from '../guideData';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);
  const guide = guideContent[id as keyof typeof guideContent];

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: guide.title,
    description: `A guide about ${guide.title}. Category: ${guide.category}.`,
  };
}

export async function generateStaticParams() {
  return Object.keys(guideContent).map((id) => ({
    id,
  }));
}

export default async function GuidePage({ params }: Props) {
  const { id } = await params;
  const guide = guideContent[parseInt(id) as keyof typeof guideContent];
  
  if (!guide) {
    notFound();
  }


  return (
    <PageContainer maxWidth="4xl">
      <GlassCard 
        title={guide.title}
        icon={guide.icon}
        headerClassName="flex items-start gap-4"
      >
        <div className="flex items-center gap-4 text-sm mb-4">
          <StatusBadge type={guide.category.toLowerCase() as 'beginner' | 'character' | 'pets' | 'social' | 'combat'}>
            {guide.category}
          </StatusBadge>
          <StatusBadge type={guide.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}>
            {guide.difficulty}
          </StatusBadge>
          <span className="text-cyan-100/70">📅 {guide.lastUpdated}</span>
        </div>
        <div className="prose prose-invert prose-cyan max-w-none">
          <div 
            className="text-cyan-100/90 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: parseMarkdownSafe(guide.content)
            }}
          />
        </div>
      </GlassCard>

      <div className="mt-8 flex gap-4 justify-center">
        <BackLink href="/guides">
          ← Back to Guides
        </BackLink>
        <BackToHomepage />
      </div>
    </PageContainer>
  );
}