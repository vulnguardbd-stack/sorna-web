import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import {render, screen, fireEvent, act} from '@testing-library/react';
import Footer from './Footer';

function fillForm() {
  fireEvent.change(screen.getByPlaceholderText('Enter Name'), {
    target: {value: 'Ada'},
  });
  fireEvent.change(screen.getByPlaceholderText('Enter Email'), {
    target: {value: 'ada@example.com'},
  });
  fireEvent.change(
    screen.getByPlaceholderText(/briefly describe your inquiry/i),
    {target: {value: 'Hello there'}},
  );
}

describe('Footer', () => {
  beforeEach(() => {
    // Fake only the timers used by the submit flow; leave rAF for `motion`.
    vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']});
  });

  afterEach(async () => {
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });
    vi.useRealTimers();
  });

  it('renders contact details and the inquiry form', () => {
    render(<Footer />);
    expect(screen.getByPlaceholderText('Enter Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
    expect(screen.getByText(/dhaka, bangladesh/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {name: /secure transmission/i}),
    ).toBeInTheDocument();
  });

  it('shows a submitting state while the message is sending', () => {
    render(<Footer />);
    fillForm();
    fireEvent.click(
      screen.getByRole('button', {name: /secure transmission/i}),
    );

    const button = screen.getByRole('button', {name: /processing/i});
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('transitions to a success confirmation after submitting', async () => {
    render(<Footer />);
    fillForm();
    fireEvent.click(
      screen.getByRole('button', {name: /secure transmission/i}),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500);
    });

    expect(screen.getByText(/message received/i)).toBeInTheDocument();
  });

  it('resets back to an empty form after the success timeout', async () => {
    render(<Footer />);
    fillForm();
    fireEvent.click(
      screen.getByRole('button', {name: /secure transmission/i}),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500);
    });
    expect(screen.getByText(/message received/i)).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    const resetName = screen.getByPlaceholderText(
      'Enter Name',
    ) as HTMLInputElement;
    expect(resetName.value).toBe('');
  });
});
