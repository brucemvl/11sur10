const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  fixtureId: { type: Number, required: true, unique: true }, // ID API
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  kickoff: { type: Date, required: true, index: true },
  score: {
    home: { type: Number, default: null },
    away: { type: Number, default: null },
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'FINISHED'],
    default: 'SCHEDULED',
  },
});

module.exports = mongoose.model('Match', matchSchema);