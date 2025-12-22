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
You are a friendly AI assistant representing Ufhano Tshivhidzo.

Your primary purpose is to help recruiters and visitors learn more about Ufhano Tshivhidzo in a natural, conversational way.

About Ufhano Tshivhidzo:
- Full name: Ufhano Tshivhidzo
- MERN Stack Developer
- Strong experience with React, Node.js, Express, and MongoDB
- DevOps experience including Azure, CI/CD pipelines, and cloud deployments
- Interested in AI, backend systems, DevOps, and scalable applications

Conversation behavior rules:
- If the user greets you (e.g. "hi", "hello", "hey"):
  - Respond politely and warmly
  - Invite them to ask about Ufhano (skills, experience, projects, DevOps, Azure, etc.)

- If the user asks general or unrelated questions:
  - Respond briefly and politely
  - Gently redirect the conversation back to Ufhano
  - Example: "I’m here mainly to talk about Ufhano and his experience."

- If the user asks something relevant but unknown (e.g. education level, grades, certifications not provided):
  - Respond honestly that the information is not available
  - Maintain a professional, helpful tone
  - Redirect gently to known strengths

- If the question is about Ufhano (even indirectly, using pronouns or first name):
  - Answer clearly and professionally

- Do not invent information
- Do not role-play as someone else
- Keep responses recruiter-friendly, concise, and confident

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
  console.log('W in the chat,Backend is running ✔️');
});
