import React, { useState } from 'react';
import { Instagram, Facebook, Send, Youtube, Check, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { reportError } from '../lib/errors';

// Stand-in for the real contact endpoint; kept async so failures are surfaced
// through the same path a network call would take.
async function submitContactForm(data: { name: string; email: string; message: string }) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    throw new Error('Please fill in your name, email, and message before sending.');
  }
}

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus('submitting');

    try {
      await submitContactForm(formData);
    } catch (err) {
      setError(reportError('Footer.submitContactForm', err));
      setStatus('idle');
      return;
    }

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
          <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 mb-4 font-semibold uppercase">Get in Touch</span>
          <div className="text-4xl md:text-6xl font-light tracking-tighter leading-none mb-4">
             SARNA <span className="font-serif italic text-white/90">Chowdhury</span>
          </div>
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
                onSubmit={(e) => { void handleSubmit(e); }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {error && (
                  <p
                    role="alert"
                    className="md:col-span-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-red-400 leading-relaxed"
                  >
                    <AlertTriangle size={14} className="shrink-0" />
                    {error}
                  </p>
                )}
                <div className="border-b border-white/10 pb-4 group focus-within:border-white transition-colors">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 block mb-2 font-bold">Full Name</span>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter Name"
                    className="bg-transparent w-full outline-none text-sm font-light placeholder:text-white/10 uppercase tracking-widest"
                  />
                </div>
                <div className="border-b border-white/10 pb-4 group focus-within:border-white transition-colors">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 block mb-2 font-bold">Email Address</span>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter Email"
                    className="bg-transparent w-full outline-none text-sm font-light placeholder:text-white/10 uppercase tracking-widest"
                  />
                </div>
                <div className="md:col-span-2 border-b border-white/10 pb-4 group focus-within:border-white transition-colors">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 block mb-2 font-bold">Your Message</span>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your inquiry..."
                    className="bg-transparent w-full outline-none text-sm font-light placeholder:text-white/10 uppercase tracking-widest resize-none"
                  />
                </div>
                <div className="md:col-span-2 text-center mt-4">
                  <button 
                    disabled={status === 'submitting'}
                    type="submit" 
                    className="px-16 py-4 border border-white/20 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-[#080808] transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center gap-4 mx-auto"
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Base of Operations</span>
            <p className="text-sm font-light text-white/80 leading-relaxed">Dhaka, Bangladesh<br /><span className="text-white/40 italic">Available for Global Directives</span></p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Narrative Inquiries</span>
            <p className="text-sm font-light text-white/80 leading-relaxed font-mono">hello@sarnachowdhury.com<br />management@sarna.studio</p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Strategic Updates</span>
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
