import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️ [MongoDB Warning]: MONGODB_URI is not set in environment variables. Database connection skipped.');
    return null;
  }

  // Check if placeholder password is still present
  if (uri.includes('<db_password>') || uri.includes('<password>')) {
    console.warn('⚠️ [MongoDB Warning]: Replace <db_password> in your .env file with your actual database password.');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ [MongoDB Connected]: Successfully connected to database host ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ [MongoDB Connection Error]:', error.message);
    return null;
  }
}
