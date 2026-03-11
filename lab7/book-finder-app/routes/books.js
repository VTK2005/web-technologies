// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

const PAGE_SIZE = 5;

// ─── Error handler helper ────────────────────────────────────────────────────
const handleError = (res, error, status = 500) => {
  console.error('Books route error:', error.message);
  res.status(status).json({ success: false, error: error.message || 'Server error' });
};

// ─── GET /books — List all with pagination ────────────────────────────────────
// Query: GET /books?page=2
router.get('/', async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1);
    const skip  = (page - 1) * PAGE_SIZE;

    // MongoDB: db.books.find().skip(skip).limit(PAGE_SIZE)
    const [books, total] = await Promise.all([
      Book.find().skip(skip).limit(PAGE_SIZE),
      Book.countDocuments()
    ]);

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / PAGE_SIZE),
      totalBooks: total,
      data: books
    });
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /books/search?title=javascript ───────────────────────────────────────
// MongoDB: db.books.find({ title: { $regex: "javascript", $options: "i" } })
router.get('/search', async (req, res) => {
  try {
    const { title } = req.query;
    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, error: 'Please provide a search term' });
    }

    const books = await Book.find({
      title: { $regex: title.trim(), $options: 'i' }
    });

    res.json({ success: true, count: books.length, query: title, data: books });
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /books/top — Top rated books ────────────────────────────────────────
// MongoDB: db.books.find({ rating: { $gte: 4 } }).limit(5)
router.get('/top', async (req, res) => {
  try {
    const books = await Book.find({ rating: { $gte: 4 } })
      .sort({ rating: -1 })
      .limit(5);

    res.json({ success: true, count: books.length, data: books });
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /books/sort/price — Sort by price (asc) ──────────────────────────────
// MongoDB: db.books.find().sort({ price: 1 })
// ─── GET /books/sort/rating — Sort by rating (desc) ──────────────────────────
// MongoDB: db.books.find().sort({ rating: -1 })
router.get('/sort/:field', async (req, res) => {
  try {
    const { field } = req.params;
    const allowed = { price: 1, rating: -1 };

    if (!allowed.hasOwnProperty(field)) {
      return res.status(400).json({
        success: false,
        error: `Invalid sort field '${field}'. Use: price or rating`
      });
    }

    const books = await Book.find().sort({ [field]: allowed[field] });
    res.json({ success: true, sortedBy: field, data: books });
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /books/category/:name — Filter by category ──────────────────────────
// MongoDB: db.books.find({ category: "Programming" })
router.get('/category/:name', async (req, res) => {
  try {
    const category = req.params.name.trim();
    if (!category) {
      return res.status(400).json({ success: false, error: 'Category name is required' });
    }

    // Case-insensitive category match
    const books = await Book.find({ category: { $regex: `^${category}$`, $options: 'i' } });
    res.json({ success: true, category, count: books.length, data: books });
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /books/:id — Single book ────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.json({ success: true, data: book });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid book ID' });
    }
    handleError(res, error);
  }
});

module.exports = router;
