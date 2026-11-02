import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import askRoute from './routes/ask.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Safe default HTTP headers.
app.use(helmet());

// Only accept small JSON bodies, so nobody can send huge requests.
app.use(express.json({ limit: '10kb' }));

// Basic rate limit: 30 requests per minute per address.
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please wait a minute and try again.' },
  })
);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/ask', askRoute);

// Unknown paths get a safe, plain message.
app.use((req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

// Safe error reply, with no technical details shown to the caller.
app.use((err, req, res, next) => {
  const status = err.status && err.status < 500 ? err.status : 500;
  res.status(status).json({
    error: status === 500 ? 'Something went wrong.' : 'Invalid request.',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});