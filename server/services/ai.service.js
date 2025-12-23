import {openai} from '../config/openai.js';
import {buildSystemPrompt} from './prompt.builder.js';

export async function getChatReply(userMessage) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {role: 'system', content: buildSystemPrompt()},
      {role: 'user', content: userMessage},
    ],
  });

  return completion.choices[0].message.content;
}
