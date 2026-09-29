import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️ [MongoDB Warning]: MONGODB_URI is not set in environment variables. Database connection skipped.');
    return null;
  }

  // Check if placeholder password is still present
  if (uri.includes('<db_password>') || uri.includes('<password>')) {
    console.warn('⚠️ [MongoDB Warning]: Replace <db_password> in your .env or Vercel environment variables with your actual database password.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log(`✅ [MongoDB Connected]: Successfully connected to database host ${mongooseInstance.connection.host}`);
      return mongooseInstance;
    }).catch((err) => {
      console.error('❌ [MongoDB Connection Error]:', err.message);
      cached.promise = null;
      return null;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
