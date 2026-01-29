const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  matchId: Number, // ID API
  homeTeam: String,
  awayTeam: String,
  kickoff: Date,
  score: {
    home: Number,
    away: Number,
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'FINISHED'],
    default: 'SCHEDULED',
  },
});

module.exports = mongoose.model('Match', matchSchema);