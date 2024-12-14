import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { reservationsRouter } from './routes/reservations.js';
import { tablesRouter } from './routes/tables.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
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

app.listen(PORT, () => {
  console.log(`
🚀 Server running on port ${PORT}
📝 Environment: ${process.env.NODE_ENV || 'development'}
🌐 Frontend URL: http://localhost:5173
🔌 API URL: http://localhost:${PORT}/api
  `);
});