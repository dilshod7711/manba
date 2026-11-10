import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import leadHandler from './api/lead.js';

// Lets `npm run dev` answer /api/lead the same way Vercel does (token comes from .env.local)
function localApi(env) {
  return {
    name: 'local-api',
    configureServer(server) {
      if (env.BOT_TOKEN) process.env.BOT_TOKEN = env.BOT_TOKEN;
      if (env.CHAT_ID) process.env.CHAT_ID = env.CHAT_ID;
      server.middlewares.use('/api/lead', (req, res) => {
        let raw = '';
        req.on('data', (chunk) => { raw += chunk; });
        req.on('end', () => {
          const reply = {
            status(code) { res.statusCode = code; return reply; },
            json(body) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); return reply; },
            setHeader(key, value) { res.setHeader(key, value); }
          };
          leadHandler({ method: req.method, body: raw }, reply);
        });
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return { plugins: [react(), localApi(env)] };
});
