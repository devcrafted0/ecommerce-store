import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`✅ Database Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌Database connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;