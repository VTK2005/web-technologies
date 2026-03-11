// server.js — Online Book Finder
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected: book_finder'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected'));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/books', require('./routes/books'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`📚 Book Finder App running at http://localhost:${PORT}`);
  console.log(`   Seed sample data with: npm run seed`);
});
