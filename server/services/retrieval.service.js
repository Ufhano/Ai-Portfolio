import Document from '../models/Document.js';
import {embedText} from './embedding.service.js';

export async function retrieveRelevantContext(query) {
  const queryEmbedding = await embedText(query);

  const results = await Document.aggregate([
    {
      $vectorSearch: {
        index: 'vector_index',
        queryVector: queryEmbedding,
        path: 'embedding',
        numCandidates: 100,
        limit: 3,
      },
    },
  ]);

  return results.map((doc) => doc.content).join('\n');
}
