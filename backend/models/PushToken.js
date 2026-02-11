const mongoose = require('mongoose');

const pushTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    teamIds: {
      type: [Number],
      default: [],
    },
    platform: {
      type: String,
      enum: ['ios', 'android'],
    },
  },
  { timestamps: true }
);

// ⚡ Export du modèle Mongoose
module.exports = mongoose.model('PushToken', pushTokenSchema);