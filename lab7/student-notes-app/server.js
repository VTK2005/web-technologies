// server.js — Student Notes Manager
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected: student_notes'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/notes', require('./routes/notes'));

// Root — serve frontend
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
    error: process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Student Notes App running at http://localhost:${PORT}`);
});
