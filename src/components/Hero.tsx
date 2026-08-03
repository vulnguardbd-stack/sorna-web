import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import MediaImage from './ui/MediaImage';

export default function Hero() {
  const [image, setImage] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200');

  // Load saved image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('sarna_profile_photo');
    if (savedImage) setImage(savedImage);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        localStorage.setItem('sarna_profile_photo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="home" className="pt-40 pb-20 px-10 min-h-screen flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="group relative w-full max-w-2xl mb-16 aspect-[16/9] overflow-hidden bg-white/5 border border-white/10"
      >
        <MediaImage
          src={image}
          alt="Sarna Chowdhury"
          className="grayscale opacity-60 mix-blend-luminosity brightness-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
        
        {/* Upload Overlay */}
        <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <div className="flex flex-col items-center gap-2">
            <Camera className="text-white" size={32} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Upload New Portrait</span>
          </div>
        </label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="z-10"
      >
        <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-6 block font-semibold">The Digital Narrative of</span>
        <h1 className="font-sans text-7xl md:text-9xl leading-[0.8] tracking-tighter mb-8 font-light">
          SARNA <br />
          <span className="font-serif italic text-white/90 text-8xl md:text-[10rem] ml-12">Chowdhury</span>
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
          <p className="max-w-xs text-[11px] leading-relaxed uppercase tracking-widest opacity-40 font-medium">
            Storytelling through lens and code. A curation of digital moments and tactical insights.
          </p>
          <div className="h-px w-24 bg-white/10 hidden md:block" />
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
             <span className="text-[9px] uppercase tracking-[0.3em] font-mono opacity-60">System Operational</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
