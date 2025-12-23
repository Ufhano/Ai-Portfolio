import express from 'express';
import {getChatReply} from '../services/ai.service.js';
import {chatRateLimiter} from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', chatRateLimiter, async (req, res) => {
  try {
    const {message} = req.body;

    if (!message) {
      return res.status(400).json({error: 'Message is required'});
    }

    const reply = await getChatReply(message);
    res.json({reply});
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({error: 'Server error'});
  }
});

export default router;
