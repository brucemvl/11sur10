const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  fixtureId: { type: Number, required: true, unique: true },
  homeTeam: String,
  awayTeam: String,
   homeLogo: String, 
  awayLogo: String, 
  kickoff: Date,
  score: {
    home: Number,
    away: Number,
  },
  status: { type: String,
     enum: ['SCHEDULED', 'LIVE', 'FINISHED'],
  default: 'SCHEDULED',
 },
  pointsUpdated: { type: Boolean, default: false },
  
  stage: String,

pointsSystem: {
  result: { type: Number, default: 1 },
  diff: { type: Number, default: 2 },
  exact: { type: Number, default: 3 },
},
});

module.exports = mongoose.model('Match', matchSchema);