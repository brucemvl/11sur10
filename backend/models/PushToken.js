const mongoose = require('mongoose');

const pushTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  updatedAt: { type: Date, default: Date.now },
  userId: {
  type: String,
  sparse: true // évite l’erreur quand userId est absent ou null
},
  leagueId: { type: Number, required: false }, // ← Nouvelle colonne

} , { timestamps: true });

module.exports = mongoose.model('PushToken', pushTokenSchema);