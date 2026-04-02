const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    category: { type: String, required: true, enum: ['Tech', 'Design', 'News'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    featured_image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
