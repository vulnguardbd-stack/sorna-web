import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import BlogPreview from './BlogPreview';

describe('BlogPreview', () => {
  it('renders the editorial heading and call to action', () => {
    render(<BlogPreview />);
    expect(screen.getByText('Journal')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {name: /view all essays/i}),
    ).toBeInTheDocument();
  });

  it('renders every mock blog title', () => {
    render(<BlogPreview />);
    expect(
      screen.getByText('The Art of Minimalist Living'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Why Social Media Needs Honesty'),
    ).toBeInTheDocument();
    expect(screen.getByText('Curating the Perfect Feed')).toBeInTheDocument();
  });

  it('renders category, date and excerpt metadata for each post', () => {
    render(<BlogPreview />);
    expect(screen.getByText('Lifestyle')).toBeInTheDocument();
    expect(screen.getByText('Thought')).toBeInTheDocument();
    expect(screen.getByText('Creator Tips')).toBeInTheDocument();
    expect(screen.getByText('Oct 24, 2025')).toBeInTheDocument();
    expect(
      screen.getByText(/how i redefined my digital and physical spaces/i),
    ).toBeInTheDocument();
  });

  it('renders one image per blog with title alt text', () => {
    render(<BlogPreview />);
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(
      screen.getByAltText('The Art of Minimalist Living'),
    ).toBeInTheDocument();
  });

  it('shows a read-narrative affordance for each post', () => {
    render(<BlogPreview />);
    expect(screen.getAllByText(/read narrative/i)).toHaveLength(3);
  });
});
