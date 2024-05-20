const express = require('express');
const auth = require('../middleware/auth');
const Drawing = require('../models/Drawing');
const router = express.Router();

// Route to save a drawing
router.post('/save', auth, async (req, res) => {
  const { drawingData } = req.body;
  try {
    const newDrawing = new Drawing({
      userId: req.user.id,
      drawingData,
    });
    await newDrawing.save();
    res.json({ msg: 'Drawing saved' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to get all drawings for a user
router.get('/all', auth, async (req, res) => {
  try {
    const drawings = await Drawing.find({ userId: req.user.id });
    res.json({ drawings });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;