import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String }, // URL to image
  published: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);