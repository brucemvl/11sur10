const mongoose = require('mongoose');

const pushTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  updatedAt: { type: Date, default: Date.now },
  userId: {
  type: String,
  unique: true,
  sparse: true // évite l’erreur quand userId est absent ou null
}
});

module.exports = mongoose.model('PushToken', pushTokenSchema);