/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialGrid from './components/SocialGrid';
import BlogPreview from './components/BlogPreview';
import SarnaAI from './components/SarnaAI';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f4f4] selection:bg-[#f4f4f4] selection:text-[#080808] font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <SocialGrid />
        <SarnaAI />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
}
