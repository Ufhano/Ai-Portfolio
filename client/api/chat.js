import {getChatReply} from './lib/ai.service.js';

export const maxDuration = 60;

const hits = new Map();

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 20) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({error: 'Method not allowed'});
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0] : '') || 'local';

  if (limited(ip.trim())) {
    return res.status(429).json({error: 'Too many requests'});
  }

  const {message, history} = req.body || {};

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({error: 'Message is required'});
  }

  try {
    const reply = await getChatReply(message, history);
    return res.status(200).json({reply});
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({error: 'Server error'});
  }
}
