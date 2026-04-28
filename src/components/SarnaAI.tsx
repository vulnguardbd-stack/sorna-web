import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are a virtual assistant for Sarna Chowdhury's personal website. 
Your goal is to represent Sarna's brand personality: elegant, artistic, sophisticated, and helpful. 
Sarna is a digital creator, blogger, and social media influencer known for her aesthetic style.
When users ask about her, provide information that sounds supportive and visionary. 
If asked about specific details you don't know, suggest they check her social feeds or reach out via the contact form.
Keep responses concise and refined. Use Bengali if the user asks in Bengali, otherwise English.`;

export default function SarnaAI() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hello, I'm Sarna's digital guide. Is there anything you'd like to know about her journey or work?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that right now." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having a little trouble connecting. Please try again later!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#1a1a1a] text-[#f5f2ed]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Sparkles size={32} className="mx-auto mb-4 opacity-50" />
          <h2 className="font-serif text-3xl italic mb-4">Ask Sarna's AI Guide</h2>
          <p className="text-[11px] uppercase tracking-[0.2em] opacity-50">Explore her universe through conversation</p>
        </div>

        <div className="border border-[#f5f2ed]/10 rounded-3xl overflow-hidden bg-[#242424]">
          <div 
            ref={scrollRef}
            className="h-[400px] overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar"
          >
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'self-end bg-[#333] border border-[#f5f2ed]/10' 
                    : 'self-start bg-transparent italic'
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && <div className="text-xs italic opacity-50 px-4 animate-pulse">Assistant is thinking...</div>}
          </div>
          
          <div className="p-4 border-t border-[#f5f2ed]/10 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about her blog, social media, or vision..."
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:opacity-30 p-2"
            />
            <button 
              onClick={handleSend}
              className="p-3 bg-[#f5f2ed] text-[#1a1a1a] rounded-full hover:scale-110 transition-transform"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
