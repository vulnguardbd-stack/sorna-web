import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the desktop navigation links with anchor targets', () => {
    render(<Navbar />);
    const home = screen.getAllByRole('link', {name: 'Home'})[0];
    expect(home).toHaveAttribute('href', '#home');
    expect(screen.getAllByRole('link', {name: 'Feed'})[0]).toHaveAttribute(
      'href',
      '#feed',
    );
    expect(
      screen.getByRole('link', {name: /connect/i}),
    ).toHaveAttribute('href', '#contact');
  });

  it('hides the mobile menu by default', () => {
    render(<Navbar />);
    // Only the 5 desktop links + Connect are present initially.
    expect(screen.getAllByRole('link', {name: 'Home'})).toHaveLength(1);
  });

  it('toggles the mobile menu open and closed', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole('button');

    await user.click(toggle);
    // Mobile menu duplicates the nav links.
    expect(screen.getAllByRole('link', {name: 'Home'})).toHaveLength(2);

    await user.click(toggle);
    expect(screen.getAllByRole('link', {name: 'Home'})).toHaveLength(1);
  });

  it('closes the mobile menu when a mobile link is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button'));

    const mobileHome = screen.getAllByRole('link', {name: 'Home'})[1];
    await user.click(mobileHome);

    expect(screen.getAllByRole('link', {name: 'Home'})).toHaveLength(1);
  });
});
