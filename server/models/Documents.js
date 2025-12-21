// server/models/Document.js
import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number],
    required: true,
  },
});

export default mongoose.model('Document', DocumentSchema);
