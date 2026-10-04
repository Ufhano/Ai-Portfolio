import mongoose from 'mongoose';

let connecting;

export function connectDb() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set');
  }

  if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose);
  if (!connecting) {
    connecting = mongoose.connect(process.env.MONGO_URI);
  }
  return connecting;
}
