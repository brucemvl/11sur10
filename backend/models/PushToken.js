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

    teamId: {
      type: Number,
      required: false,
    },

    platform: {
      type: String,
      enum: ['ios', 'android'],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PushToken', pushTokenSchema);