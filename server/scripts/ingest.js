import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Document from '../models/Document.js';
import {embedText} from '../services/embeddings.js';

await mongoose.connect(process.env.MONGO_URI);

const dataDir = path.join(process.cwd(), 'data');
const files = fs.readdirSync(dataDir);

for (const file of files) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');

  const embedding = await embedText(content);

  await Document.create({content, embedding});

  console.log(`Embedded ${file}`);
}

process.exit();
