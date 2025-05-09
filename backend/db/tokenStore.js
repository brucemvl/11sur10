const PushToken = require('../models/PushToken');

exports.saveToken = async (token) => {
  await PushToken.findOneAndUpdate(
    { token }, // chercher par token
    { token }, // pas de userId
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

async function getAllTokens() {
  const tokens = await PushToken.find({});
  return tokens.map(t => t.token);
}

module.exports = { getAllTokens };