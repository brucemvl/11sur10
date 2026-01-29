const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  
  userId: ObjectId,        // 🔑 utilisateur
  matchId: Number,         // fixture id
  predictedHome: Number,
  predictedAway: Number,
  points: Number,          // calculés après le match
  createdAt: Date

});

module.exports = mongoose.model('Prediction', predictionSchema);