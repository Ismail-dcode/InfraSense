import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../server/config/db.js';
import authRoutes from '../server/routes/auth.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'InfraSense Auth API (Serverless)',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  });
});

app.use('/api/auth', authRoutes);

// Export for Vercel Serverless Function
export default app;
