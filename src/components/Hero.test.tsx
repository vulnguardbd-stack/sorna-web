import {describe, it, expect, beforeEach} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from './Hero';

const STORAGE_KEY = 'sarna_profile_photo';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200';

describe('Hero', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the default portrait when localStorage is empty', () => {
    render(<Hero />);
    expect(screen.getByAltText('Sarna Chowdhury')).toHaveAttribute(
      'src',
      DEFAULT_IMAGE,
    );
  });

  it('loads a saved portrait from localStorage on mount', () => {
    const saved = 'data:image/png;base64,SAVED';
    localStorage.setItem(STORAGE_KEY, saved);
    render(<Hero />);
    expect(screen.getByAltText('Sarna Chowdhury')).toHaveAttribute(
      'src',
      saved,
    );
  });

  it('renders the static hero copy', () => {
    render(<Hero />);
    expect(screen.getByText(/system operational/i)).toBeInTheDocument();
    expect(screen.getByText(/upload new portrait/i)).toBeInTheDocument();
  });

  it('persists an uploaded portrait to state and localStorage', async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const file = new File(['hello'], 'portrait.png', {type: 'image/png'});
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(input, file);

    await waitFor(() => {
      const src = screen
        .getByAltText('Sarna Chowdhury')
        .getAttribute('src');
      expect(src).toMatch(/^data:image\/png;base64,/);
      expect(localStorage.getItem(STORAGE_KEY)).toBe(src);
    });
  });
});
