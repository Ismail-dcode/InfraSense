import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../server/config/db.js';
import authRoutes from '../server/routes/auth.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'InfraSense Auth API (Serverless)',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// Middleware to ensure DB connection before auth operations
app.use('/api/auth', async (req, res, next) => {
  try {
    const conn = await connectDB();
    if (!conn) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is unavailable. Please ensure MongoDB Atlas Network Access allows 0.0.0.0/0 (Anywhere) and MONGODB_URI has the valid password.',
      });
    }
    next();
  } catch (err) {
    return res.status(503).json({
      success: false,
      message: 'Database connection failed: ' + (err.message || 'Check MongoDB Atlas IP Whitelist'),
    });
  }
});

// Auth Routes
app.use('/api/auth', authRoutes);

// Export for Vercel Serverless Function
export default app;
