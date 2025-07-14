const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Stats = require('../models/Stats');

// @route   GET api/dashboard/stats
// @desc    Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await Stats.findOne({ user: req.user.id });
    
    if (!stats) {
      return res.status(404).json({ msg: 'Stats not found' });
    }

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;