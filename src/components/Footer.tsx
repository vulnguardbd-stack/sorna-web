import React, { useState } from 'react';
import { Instagram, Facebook, Send, Youtube, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, LABEL, OUTLINE_BUTTON } from '../lib/styles';
import FormField from './ui/FormField';
import Wordmark from './ui/Wordmark';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <footer id="contact" className="bg-[#080808] border-t border-white/5 py-32 px-10 mt-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -bottom-20 -left-20 text-[20rem] font-serif italic text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">
        Sarna
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 mb-4 font-semibold">Get in Touch</span>
          <Wordmark className="text-4xl md:text-6xl mb-4" />
        </div>

        {/* Contact Form Section */}
        <div className="w-full max-w-2xl mb-32 relative z-10">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full border border-green-500/30 flex items-center justify-center mb-6 text-green-500">
                  <Check size={32} />
                </div>
                <h3 className="font-serif text-3xl italic mb-4">Message Received</h3>
                <p className="text-[11px] uppercase tracking-widest text-white/40 max-w-[200px] leading-relaxed">
                  Management will review your inquiry within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <FormField
                  label="Full Name"
                  value={formData.name}
                  placeholder="Enter Name"
                  onChange={(name) => setFormData({ ...formData, name })}
                />
                <FormField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  placeholder="Enter Email"
                  onChange={(email) => setFormData({ ...formData, email })}
                />
                <FormField
                  label="Your Message"
                  rows={4}
                  value={formData.message}
                  placeholder="Briefly describe your inquiry..."
                  onChange={(message) => setFormData({ ...formData, message })}
                  className="md:col-span-2"
                />
                <div className="md:col-span-2 text-center mt-4">
                  <button 
                    disabled={status === 'submitting'}
                    type="submit" 
                    className={cn(
                      OUTLINE_BUTTON,
                      'px-16 py-4 text-[11px] tracking-[0.4em] disabled:opacity-50 disabled:cursor-not-allowed group flex items-center gap-4 mx-auto',
                    )}
                  >
                    {status === 'submitting' ? 'Processing...' : 'Secure Transmission'}
                    <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex gap-12 mb-20">
          {[Instagram, Facebook, Send, Youtube].map((Icon, idx) => (
            <a key={idx} href="#" className="text-white/40 hover:text-white transition-colors">
              <Icon size={24} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-3 w-full border-t border-white/10 pt-20 gap-16 text-left">
          <div className="flex flex-col gap-4">
            <span className={LABEL}>Base of Operations</span>
            <p className="text-sm font-light text-white/80 leading-relaxed">Dhaka, Bangladesh<br /><span className="text-white/40 italic">Available for Global Directives</span></p>
          </div>
          <div className="flex flex-col gap-4">
            <span className={LABEL}>Narrative Inquiries</span>
            <p className="text-sm font-light text-white/80 leading-relaxed font-mono">hello@sarnachowdhury.com<br />management@sarna.studio</p>
          </div>
          <div className="flex flex-col gap-4">
            <span className={LABEL}>Strategic Updates</span>
            <div className="flex border-b border-white/20 pb-3 group focus-within:border-white transition-colors">
              <input type="email" placeholder="YOUR EMAIL" className="bg-transparent text-[11px] uppercase outline-none flex-1 placeholder:text-white/20 tracking-[0.2em]" />
              <button className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="mt-32 flex flex-col md:flex-row justify-between w-full text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold border-t border-white/5 pt-10">
          <div>© 2026 Sarna Chowdhury Studio</div>
          <div className="flex gap-8 mt-4 md:mt-0">
             <span>Status: All Systems Operational</span>
             <span className="hidden md:block select-none opacity-20">|</span>
             <span className="font-mono">Vercel: Production Edge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
