import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../config/logger.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai_heal_db';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 2000, // Fail after 2 seconds instead of 30
      connectTimeoutMS: 5000,         // Give up on initial connection after 5s
    });

    const conn = await mongoose.connect(MONGO_URI);

    logger.info({
      msg: "MONGODB_CONNECTED",
      host: conn.connection.host,
      db: conn.connection.name
    });
  } catch (error) {
    logger.fatal({
      msg: "MONGODB_CRITICAL_FAILURE",
      error_details: error.message, // Explicitly string
      stack: error.stack           // Explicitly string
    });
    process.exit(1);
  }
};

export default connectDB;
