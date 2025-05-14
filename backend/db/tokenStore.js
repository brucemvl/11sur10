const PushToken = require('../models/PushToken');

exports.saveToken = async (token, userId) => {
  await PushToken.findOneAndUpdate(
    { token },
    { token, userId }, // Associer le token avec un userId
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

async function getAllTokens() {
  const tokens = await PushToken.find({});
  return tokens.map(t => t.token);
}

module.exports = { getAllTokens };