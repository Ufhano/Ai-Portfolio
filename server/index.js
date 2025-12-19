import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// OpenAI config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat route
app.post('/api/chat', async (req, res) => {
  try {
    const {message} = req.body;

    const systemPrompt = `
You are an AI assistant that answers questions ONLY about Ufhano Tshivhidzo.

Profile:
- MERN Stack Developer
- Experience with React, Node.js, Express, MongoDB
- Interested in AI, backend systems, and scalable applications

Rules:
- Only answer questions related to Ufhano Tshivhidzo
- If the question is unrelated, respond with:
  "I only answer questions about Ufhano Tshivhidzo."
- Do not invent information
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {role: 'system', content: systemPrompt},
        {role: 'user', content: message},
      ],
    });

    res.json({reply: completion.choices[0].message.content});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Server error'});
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
