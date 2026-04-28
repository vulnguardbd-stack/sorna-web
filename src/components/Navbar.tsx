import { motion } from 'motion/react';
import { Instagram, Facebook, Video, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-1 font-semibold leading-none">Portfolio of</span>
          <div className="text-2xl font-light tracking-tighter leading-none">
            SARNA <span className="font-serif italic text-white/90">Chowdhury</span>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-white/60">
          {['Home', 'Feed', 'Archive', 'Blog', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2 border border-white/20 rounded-sm hover:bg-white hover:text-[#080808] transition-all flex items-center gap-2"
          >
            Connect <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#f5f2ed] border-b border-[#1a1a1a]/10 p-6 flex flex-col gap-4 text-sm font-medium uppercase text-center"
        >
          {['Home', 'Feed', 'Archive', 'Blog', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
