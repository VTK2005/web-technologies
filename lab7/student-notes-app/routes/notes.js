// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// ─── Error handler helper ───────────────────────────────────────────────────
const handleError = (res, error, statusCode = 500) => {
  console.error('Error:', error.message);
  res.status(statusCode).json({
    success: false,
    error: error.message || 'Internal Server Error'
  });
};

// ─── GET /notes — Retrieve all notes ────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /notes/:id — Retrieve a single note ────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    // Catch invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid note ID format' });
    }
    handleError(res, error);
  }
});

// ─── POST /notes — Create a new note ────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { title, subject, description } = req.body;

    // Validate required fields
    if (!title || !subject || !description) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title, subject, and description'
      });
    }

    const note = await Note.create({ title, subject, description });
    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    handleError(res, error);
  }
});

// ─── PUT /notes/:id — Update a note ─────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const { title, subject, description } = req.body;

    // Ensure at least one field is being updated
    if (!title && !subject && !description) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least one field to update'
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (subject) updateData.subject = subject;
    if (description) updateData.description = description;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid note ID format' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    handleError(res, error);
  }
});

// ─── DELETE /notes/:id — Delete a note ──────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid note ID format' });
    }
    handleError(res, error);
  }
});

module.exports = router;
