import mongoose from "mongoose";

async function dbConnect() {
  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("Tidak ada mongodb uri di env");
    }

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
