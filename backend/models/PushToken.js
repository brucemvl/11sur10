const mongoose = require('mongoose');

const pushTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('PushToken', pushTokenSchema);