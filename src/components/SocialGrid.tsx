import { motion } from 'motion/react';
import { type Post } from '../types';
import { Instagram, Facebook, Send } from 'lucide-react';

const MOCK_POSTS: Post[] = [
  { id: '1', platform: 'instagram', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', url: '#', caption: 'Golden hour moments.', date: '2h ago' },
  { id: '2', platform: 'tiktok', type: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', url: '#', caption: 'Latest vlog is out!', date: '6h ago' },
  { id: '3', platform: 'facebook', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400', url: '#', caption: 'Reflecting on the journey.', date: '1d ago' },
  { id: '4', platform: 'instagram', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400', url: '#', caption: 'Design is in the details.', date: '2d ago' },
  { id: '5', platform: 'tiktok', type: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', url: '#', caption: 'Bts of our last shoot.', date: '3d ago' },
  { id: '6', platform: 'instagram', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', url: '#', caption: 'Aesthetic morning.', date: '4d ago' },
];

export default function SocialGrid() {
  return (
    <section id="feed" className="py-32 px-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 gap-8">
        <div className="relative">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/30 block mb-4">The Aggregation Engine</span>
          <h2 className="font-light text-6xl md:text-8xl tracking-tighter">Unified <br /><span className="font-serif italic text-white/90">Feed</span></h2>
          <div className="absolute -left-10 top-0 h-full w-[1px] bg-white/5 hidden xl:block" />
        </div>
        <div className="max-w-sm p-6 bg-white/5 border border-white/10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 leading-relaxed font-medium">
            Real-time feed integration utilizing tactical API calls to merge Instagram, TikTok, and Facebook narratives into a single curated stream.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {MOCK_POSTS.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col cursor-pointer"
          >
            <div className="aspect-square overflow-hidden bg-white/5 border border-white/10 p-1 mb-6">
              <img 
                src={post.thumbnailUrl} 
                alt={post.caption} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                  {post.platform === 'instagram' && <Instagram size={10} />}
                  {post.platform === 'facebook' && <Facebook size={10} />}
                  {post.platform === 'tiktok' && <Send size={10} className="rotate-[-45deg]" />}
                  {post.platform} narrative
                </span>
                <p className="text-sm font-serif italic text-white/80 line-clamp-1">{post.caption}</p>
              </div>
              <span className="text-[9px] font-mono text-white/30 uppercase mt-1">{post.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-white/5" />
        <button className="px-10 py-3 border border-white/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-[#080808] transition-all">
          Expand Archive
        </button>
        <div className="h-px flex-1 bg-white/5" />
      </div>
    </section>
  );
}
