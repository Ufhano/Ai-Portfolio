import {openai} from '../config/openai.js';
import {buildSystemPrompt} from './prompt.builder.js';
import {retrieveRelevantContext} from './retrieval.service.js';
import {listPublicProjects} from './projects.service.js';

const LINK_REQUEST =
  /\b(link|url|github|website|site|portfolio|project|demo|live|google|search|repo)\b/i;

function needsWebSearch(message, history) {
  if (LINK_REQUEST.test(message)) return true;

  const words = message.trim().split(/\s+/);
  const refersBack = /\b(link|it|that|those|them|one|send|share|where)\b/i.test(
    message,
  );
  return words.length <= 12 && refersBack && history.length > 0;
}

function safeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (item) =>
        item &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim(),
    )
    .slice(-8)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 2000),
    }));
}

async function complete(messages, search) {
  if (!search) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });
    return completion.choices[0].message.content;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini-search-preview',
      web_search_options: {search_context_size: 'low'},
      messages,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Web search failed:', error.message);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });
    return completion.choices[0].message.content;
  }
}

export async function getChatReply(userMessage, history = []) {
  const prior = safeHistory(history);
  const search = needsWebSearch(userMessage, prior);

  const [context, projects] = await Promise.all([
    retrieveRelevantContext(userMessage).catch((error) => {
      console.error('Retrieval failed:', error.message);
      return '';
    }),
    listPublicProjects().catch((error) => {
      console.error('Project lookup failed:', error.message);
      return '';
    }),
  ]);

  const messages = [
    {role: 'system', content: buildSystemPrompt()},
    {
      role: 'system',
      content: `Notes from the portfolio:\n${context || 'None'}\n\nPublic projects:\n${projects || 'None'}\n\nIf this question needs a link, search the web for "Ufhano Tshivhidzo" and the project just discussed, then answer with the URLs you find.`,
    },
    ...prior,
    {role: 'user', content: userMessage},
  ];

  return complete(messages, search);
}
