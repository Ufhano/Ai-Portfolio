import {openai} from '../config/openai.js';
import {buildSystemPrompt} from './prompt.builder.js';
import {retrieveRelevantContext} from './retrieval.service.js';

export async function getChatReply(userMessage) {
  const context = await retrieveRelevantContext(userMessage);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: buildSystemPrompt(),
      },
      {
        role: 'system',
        content: `Context about Ufhano:\n${context}`,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });

  return completion.choices[0].message.content;
}
