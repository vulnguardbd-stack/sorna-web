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
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f4f4] selection:bg-[#f4f4f4] selection:text-[#080808] font-sans antialiased">
      <ErrorBoundary name="Navbar"><Navbar /></ErrorBoundary>
      <main>
        <ErrorBoundary name="Hero"><Hero /></ErrorBoundary>
        <ErrorBoundary name="SocialGrid"><SocialGrid /></ErrorBoundary>
        <ErrorBoundary name="SarnaAI"><SarnaAI /></ErrorBoundary>
        <ErrorBoundary name="BlogPreview"><BlogPreview /></ErrorBoundary>
      </main>
      <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
    </div>
  );
}
