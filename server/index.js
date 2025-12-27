import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import chatRoutes from './routes/chat.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.get('/health', (_, res) => {
  res.json({status: 'ok'});
});

app.use('/api/chat', chatRoutes);

app.listen(5000, () => {
  console.log('Backend is running ✔️');
});
