import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Document from '../models/Documents.js';
import {embedText} from '../services/embedding.service.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const dataDir = path.join(process.cwd(), 'data');
const files = fs.readdirSync(dataDir);

for (const file of files) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  const embedding = await embedText(content);

  await Document.create({content, embedding});

  console.log(`Embedded ${file}`);
}

console.log('Ingestion complete');
process.exit();
