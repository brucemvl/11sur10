const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    matchId: {
      type: Number, // fixtureId
      required: true,
    },
    predictedHome: {
      type: Number,
      required: true,
    },
    predictedAway: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// 🔒 1 seul pronostic par user et par match
predictionSchema.index({ userId: 1, matchId: 1 }, { unique: true });

module.exports = mongoose.model('Prediction', predictionSchema);