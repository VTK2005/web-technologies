// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5']
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  }
}, { timestamps: true });

// Text index for search
bookSchema.index({ title: 'text', author: 'text' });

module.exports = mongoose.model('Book', bookSchema);
