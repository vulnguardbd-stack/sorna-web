---
name: testing-sorna-web
description: How to run and end-to-end test the sorna-web React/Vite personal site locally, including error/edge-case paths (Gemini chat, portrait upload, contact form, ErrorBoundary fallbacks).
---

# Testing sorna-web locally

## Run it
```bash
cd /home/ubuntu/repos/sorna-web
npm install            # usually already done
cp .env.example .env.local
npm run dev            # Vite on http://localhost:3000 (--host 0.0.0.0)
```
There is **no backend**. `vite.config.ts` injects only `process.env.GEMINI_API_KEY` via
`define`, read from `.env.local` (`loadEnv`). Changing `.env.local` requires a browser
reload; Vite picks up the new value without a server restart in most cases — if a stale
value seems cached, restart `npm run dev`.

## API key states worth testing
`.env.example` ships `GEMINI_API_KEY="MY_GEMINI_API_KEY"`, which is a *useful* test value:
it is present but invalid, so Google returns a real `400 API_KEY_INVALID` you can assert on.
Set `GEMINI_API_KEY=""` to test the "not configured" guard instead. A real key is only
needed to test a successful chat response / empty-response handling.

## Where the features live
- Chat: `src/components/SarnaAI.tsx` — scroll to the "Ask Sarna's AI Guide" section, type in
  the text input, click the round send button (disabled when input empty or loading).
  Errors render as a red `role="alert"` box with a Retry button.
- Portrait upload: `src/components/Hero.tsx` — the file input is inside a `<label>` overlay
  that is `opacity-0` until you hover the portrait. Move the mouse onto the portrait, then
  click it to open the native GTK file chooser. The input has `accept="image/*"`, so to test
  the non-image rejection you must switch the chooser's filter dropdown (bottom right) from
  "Image Files" to "All Files", then use `Ctrl+L` to type an absolute path.
  Uploaded portraits are stored in `localStorage['sarna_profile_photo']`, so persistence is
  verified with a plain reload. Uploaded images look muted grey because the section applies
  grayscale/mix-blend-luminosity — verify via the `img src` data URL, not the color.
- Contact form: `src/components/Footer.tsx` — `submitContactForm()` is a stub that sleeps
  1.5 s and throws if any trimmed field is empty. Inputs are `required`, so to reach the
  error path you must enter **whitespace-only** name/message (a single space passes HTML
  validation but fails the trim check).

## Triggering an ErrorBoundary fallback
`src/App.tsx` wraps each section in its own `ErrorBoundary`. The reliable way to demo
isolation is a temporary edit: add `throw new Error('Boom: X test')` as the first line of a
section component (e.g. `SocialGrid`), reload, screenshot, then revert (keep a backup copy
first, and confirm `git status` is clean afterwards). React StrictMode in dev may log the
error twice — that is expected, not a bug.

## Evidence tips
`reportError` logs with a `[Context] message` prefix, so `browser_console` output is a good
way to prove a Retry actually re-issued a request (you should see two separate
`[SarnaAI.generateContent]` entries for one user message).

## Devin Secrets Needed
- `GEMINI_API_KEY` — only required to test a *successful* chat response; all error-path
  testing works without it.
