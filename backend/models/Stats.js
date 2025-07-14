const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  followers: {
    count: { type: Number, default: 20140 },
    change: { type: Number, default: 8.6 }
  },
  likes: {
    count: { type: Number, default: 80460 },
    change: { type: Number, default: -4.2 }
  },
  comments: {
    count: { type: Number, default: 16240 },
    change: { type: Number, default: -2.8 }
  },
  reach: {
    count: { type: Number, default: 428160 },
    change: { type: Number, default: 12.8 }
  },
  audience: {
    total: { type: Number, default: 4520 }
  },
  followerGrowth: [
    {
      country: String,
      percentage: Number
    }
  ],
  recentActivities: [
    {
      name: String,
      action: String,
      date: String,
      platform: String
    }
  ]
});

module.exports = mongoose.model('Stats', StatsSchema);