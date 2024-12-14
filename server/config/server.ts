import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { router as authRouter } from '../routes/auth';
import { router as reservationsRouter } from '../routes/reservations';
import { router as tablesRouter } from '../routes/tables';
import { errorHandler } from '../middleware/errorHandler';

const app = express();

// Middleware
app.use(json());
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173' 
    : true,
  credentials: true
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/tables', tablesRouter);

// Error handling
app.use(errorHandler);

export { app };