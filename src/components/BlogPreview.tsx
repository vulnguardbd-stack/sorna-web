import { motion } from 'motion/react';
import { type BlogItem } from '../types';
import { revealOnScroll } from '../lib/motion';
import { cn, HAIRLINE, UNDERLINE_BUTTON } from '../lib/styles';
import MediaImage from './ui/MediaImage';
import SectionHeading from './ui/SectionHeading';

const MOCK_BLOGS: BlogItem[] = [
  { id: '1', title: 'The Art of Minimalist Living', excerpt: 'How I redefined my digital and physical spaces to find clarity...', category: 'Lifestyle', date: 'Oct 24, 2025', imageUrl: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=600', content: '' },
  { id: '2', title: 'Why Social Media Needs Honesty', excerpt: 'Behind the filters, there is a story that needs to be told...', category: 'Thought', date: 'Sept 15, 2025', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600', content: '' },
  { id: '3', title: 'Curating the Perfect Feed', excerpt: 'My top 5 tips for maintaining a cohesive and inspiring aesthetic...', category: 'Creator Tips', date: 'Aug 05, 2025', imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600', content: '' },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="py-32 px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <SectionHeading
            eyebrow="Editorial Archive"
            title="WRITTEN"
            accent="Journal"
            titleClassName="text-7xl md:text-9xl leading-[0.8]"
          />
          <button className={cn(UNDERLINE_BUTTON, 'self-start md:self-auto mt-12 md:mt-0')}>
            View All Essays
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {MOCK_BLOGS.map((blog, index) => (
            <motion.div
              key={blog.id}
              {...revealOnScroll(index)}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="aspect-[4/5] overflow-hidden bg-white/5 border border-white/10 mb-8 grayscale group-hover:grayscale-0 transition-all duration-1000 p-1">
                <MediaImage
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="opacity-60 group-hover:opacity-100 transition-all duration-700"
                />
              </div>
              <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-6">
                <span>{blog.category}</span>
                <div className={cn(HAIRLINE, 'flex-1')} />
                <span>{blog.date}</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl group-hover:italic transition-all mb-4 leading-tight font-light">{blog.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-light line-clamp-3 group-hover:text-white/80 transition-colors">{blog.excerpt}</p>
              
              <div className="mt-auto pt-8 flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/30 group-hover:text-white transition-all">
                Read Narrative <div className="h-px w-8 bg-white/10 group-hover:w-12 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
