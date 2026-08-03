<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/32c29c14-a927-4691-8be8-1ff7e6a71a47

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key.
   The key is used only by the API server (`server/index.ts`) and is never sent
   to the browser.
3. Run the app (starts the API server and the Vite dev server):
   `npm run dev`

The frontend talks to Gemini through `POST /api/chat`, which validates input,
rate limits by IP, and rejects cross-origin requests unless the origin is listed
in `ALLOWED_ORIGINS`. In production, `npm run build && npm start` serves `dist/`
and the API from the same origin.
