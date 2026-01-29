const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // ✅ ICI
      ref: 'User',
      required: true,
    },

    matchId: {
      type: Number,
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

    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ❗ Empêche plusieurs pronos pour le même match / utilisateur
PredictionSchema.index({ userId: 1, matchId: 1 }, { unique: true });

module.exports = mongoose.model('Prediction', PredictionSchema);