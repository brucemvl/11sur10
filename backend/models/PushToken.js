const mongoose = require('mongoose');

const pushTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true }, // unique pour éviter les doublons
}, { timestamps: true });

module.exports = mongoose.model('PushToken', pushTokenSchema);