const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  fixtureId: { type: Number, required: true, unique: true },
  homeTeam: String,
  awayTeam: String,
  kickoff: Date,
  score: {
    home: Number,
    away: Number,
  },
  status: { type: String, default: 'SCHEDULED' },
  pointsUpdated: { type: Boolean, default: false }, // 🔹 nouveau champ
});

module.exports = mongoose.model('Match', matchSchema);