/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import express, {type NextFunction, type Request, type Response} from 'express';
import path from 'path';
import {GoogleGenAI} from '@google/genai';

const PORT = Number(process.env.PORT ?? 8080);
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;

const SYSTEM_INSTRUCTION = `You are a virtual assistant for Sarna Chowdhury's personal website.
Your goal is to represent Sarna's brand personality: elegant, artistic, sophisticated, and helpful.
Sarna is a digital creator, blogger, and social media influencer known for her aesthetic style.
When users ask about her, provide information that sounds supportive and visionary.
If asked about specific details you don't know, suggest they check her social feeds or reach out via the contact form.
Keep responses concise and refined. Use Bengali if the user asks in Bengali, otherwise English.`;

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set. The chat API cannot start without it.');
}
const ai = new GoogleGenAI({apiKey});

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? process.env.APP_URL ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();
app.disable('x-powered-by');
app.use(express.json({limit: '32kb'}));

/** Same-origin by default; cross-origin requests need an explicit allowlist entry. */
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin) {
    if (!allowedOrigins.includes(origin)) {
      res.status(403).json({error: 'Origin not allowed'});
      return;
    }
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

const requestLog = new Map<string, number[]>();

function rateLimit(req: Request, res: Response, next: NextFunction) {
  const now = Date.now();
  const key = req.ip ?? 'unknown';
  const hits = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (hits.length >= RATE_LIMIT_MAX_REQUESTS) {
    res.status(429).json({error: 'Too many requests. Please slow down.'});
    return;
  }
  hits.push(now);
  requestLog.set(key, hits);
  if (requestLog.size > 10_000) {
    requestLog.clear();
  }
  next();
}

app.post('/api/chat', rateLimit, async (req: Request, res: Response) => {
  const {message} = req.body ?? {};
  if (typeof message !== 'string') {
    res.status(400).json({error: 'A "message" string is required.'});
    return;
  }
  const trimmed = message.trim();
  if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) {
    res
      .status(400)
      .json({error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.`});
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{role: 'user', parts: [{text: trimmed}]}],
      config: {systemInstruction: SYSTEM_INSTRUCTION},
    });
    res.json({text: response.text ?? ''});
  } catch (error) {
    console.error('Gemini request failed', error);
    res.status(502).json({error: 'The assistant is unavailable right now.'});
  }
});

const distDir = path.resolve(process.cwd(), 'dist');
app.use(express.static(distDir));
app.get(/^\/(?!api\/).*/, (_req: Request, res: Response) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
