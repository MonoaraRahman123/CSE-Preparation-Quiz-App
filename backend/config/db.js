import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config();

const DEFAULT_ATLAS_URI = "mongodb+srv://monoara_rahman:moni210127@cluster0.g3ymdpi.mongodb.net/cseprep?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || DEFAULT_ATLAS_URI;
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host} (DB: ${conn.connection.name})`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB connection error (${error.message}).`);
    console.log(`[Database] Running with embedded fallback store.`);
    return false;
  }
};
