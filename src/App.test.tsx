import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';

// SarnaAI instantiates the Gemini client at import time; stub it out.
vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    models = {generateContent: vi.fn()};
  },
}));

import App from './App';

describe('App', () => {
  it('composes the primary landing page sections', () => {
    render(<App />);

    // Navbar
    expect(screen.getByText('Portfolio of')).toBeInTheDocument();
    // Hero
    expect(screen.getByAltText('Sarna Chowdhury')).toBeInTheDocument();
    // SocialGrid
    expect(
      screen.getByRole('button', {name: /expand archive/i}),
    ).toBeInTheDocument();
    // SarnaAI
    expect(screen.getByText(/ask sarna's ai guide/i)).toBeInTheDocument();
    // BlogPreview
    expect(
      screen.getByRole('button', {name: /view all essays/i}),
    ).toBeInTheDocument();
    // Footer
    expect(
      screen.getByRole('button', {name: /secure transmission/i}),
    ).toBeInTheDocument();
  });
});
