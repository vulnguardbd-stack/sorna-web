import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import SocialGrid from './SocialGrid';

describe('SocialGrid', () => {
  it('renders the section heading and archive action', () => {
    render(<SocialGrid />);
    expect(screen.getByText('Feed')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {name: /expand archive/i}),
    ).toBeInTheDocument();
  });

  it('renders every mock post caption', () => {
    render(<SocialGrid />);
    const captions = [
      'Golden hour moments.',
      'Latest vlog is out!',
      'Reflecting on the journey.',
      'Design is in the details.',
      'Bts of our last shoot.',
      'Aesthetic morning.',
    ];
    captions.forEach((caption) => {
      expect(screen.getByText(caption)).toBeInTheDocument();
    });
  });

  it('renders one image per post with caption alt text', () => {
    render(<SocialGrid />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(6);
    expect(
      screen.getByAltText('Golden hour moments.'),
    ).toBeInTheDocument();
  });

  it('labels posts with their platform narrative', () => {
    render(<SocialGrid />);
    expect(screen.getAllByText(/^instagram narrative$/i)).toHaveLength(3);
    expect(screen.getAllByText(/^tiktok narrative$/i)).toHaveLength(2);
    expect(screen.getByText(/^facebook narrative$/i)).toBeInTheDocument();
  });
});
