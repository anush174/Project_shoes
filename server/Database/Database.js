import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const databaseconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

export default databaseconnection;