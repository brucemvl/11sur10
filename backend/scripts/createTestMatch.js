require('dotenv').config();
const mongoose = require('mongoose');
const Match = require('../models/Match');

const mongoURI = process.env.MONGO_URI;

async function createTestMatch() {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const fixtureId = 1387870;

  const existing = await Match.findOne({ fixtureId });
  if (!existing) {
    const match = await Match.create({
      fixtureId,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      kickoff: new Date(),
      score: { home: 2, away: 1 }, // Score réel
      status: 'FINISHED',
      pointsUpdated: false
    });
    console.log('✅ Match de test créé', match);
  } else {
    console.log('⚠️ Match de test déjà présent');
  }

  await mongoose.disconnect();
}

createTestMatch();