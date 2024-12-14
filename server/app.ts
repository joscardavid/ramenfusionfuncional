import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config/env';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: config.isDev ? 'http://localhost:5173' : true,
  credentials: true
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', apiRouter);

// Error handling
app.use(errorHandler);

export { app };