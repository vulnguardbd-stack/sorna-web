import {describe, it, expect, beforeEach, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const {generateContent} = vi.hoisted(() => ({
  generateContent: vi.fn(),
}));

vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    models = {generateContent};
  },
}));

import SarnaAI from './SarnaAI';

describe('SarnaAI', () => {
  beforeEach(() => {
    generateContent.mockReset();
  });

  it('renders the initial assistant greeting', () => {
    render(<SarnaAI />);
    expect(
      screen.getByText(/i'm sarna's digital guide/i),
    ).toBeInTheDocument();
  });

  it('does not call the model for empty or whitespace input', async () => {
    const user = userEvent.setup();
    render(<SarnaAI />);
    await user.click(screen.getByRole('button'));

    const input = screen.getByPlaceholderText(/ask about her blog/i);
    await user.type(input, '   ');
    await user.click(screen.getByRole('button'));

    expect(generateContent).not.toHaveBeenCalled();
  });

  it('sends the user message and renders the model reply', async () => {
    generateContent.mockResolvedValue({text: 'A refined reply.'});
    const user = userEvent.setup();
    render(<SarnaAI />);

    const input = screen.getByPlaceholderText(/ask about her blog/i);
    await user.type(input, 'Who is Sarna?');
    await user.click(screen.getByRole('button'));

    expect(await screen.findByText('Who is Sarna?')).toBeInTheDocument();
    expect(await screen.findByText('A refined reply.')).toBeInTheDocument();

    expect(generateContent).toHaveBeenCalledTimes(1);
    const arg = generateContent.mock.calls[0][0];
    expect(arg.model).toBe('gemini-3-flash-preview');
    expect(arg.config.systemInstruction).toMatch(/Sarna Chowdhury/);
    expect(arg.contents[0].parts[0].text).toBe('Who is Sarna?');

    // Input is cleared after sending.
    expect(
      (screen.getByPlaceholderText(/ask about her blog/i) as HTMLInputElement)
        .value,
    ).toBe('');
  });

  it('sends when the Enter key is pressed', async () => {
    generateContent.mockResolvedValue({text: 'Reply via enter.'});
    const user = userEvent.setup();
    render(<SarnaAI />);

    const input = screen.getByPlaceholderText(/ask about her blog/i);
    await user.type(input, 'Hello{Enter}');

    expect(await screen.findByText('Reply via enter.')).toBeInTheDocument();
    expect(generateContent).toHaveBeenCalledTimes(1);
  });

  it('falls back to a default message when the reply has no text', async () => {
    generateContent.mockResolvedValue({text: ''});
    const user = userEvent.setup();
    render(<SarnaAI />);

    await user.type(
      screen.getByPlaceholderText(/ask about her blog/i),
      'Anything?',
    );
    await user.click(screen.getByRole('button'));

    expect(
      await screen.findByText(/couldn't process that right now/i),
    ).toBeInTheDocument();
  });

  it('shows a connection error message when the request fails', async () => {
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    generateContent.mockRejectedValue(new Error('network down'));
    const user = userEvent.setup();
    render(<SarnaAI />);

    await user.type(
      screen.getByPlaceholderText(/ask about her blog/i),
      'Are you there?',
    );
    await user.click(screen.getByRole('button'));

    expect(
      await screen.findByText(/having a little trouble connecting/i),
    ).toBeInTheDocument();
    await waitFor(() => expect(errorSpy).toHaveBeenCalled());
    errorSpy.mockRestore();
  });
});
