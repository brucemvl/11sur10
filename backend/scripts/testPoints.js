require('dotenv').config();
const mongoose = require('mongoose');
const Match = require('../models/Match');
const Prediction = require('../models/Prediction');
const calculatePoints = require('../utils/calculatePoints');

async function test() {
  await mongoose.connect(process.env.MONGO_URI);

  const match = await Match.findOne({ fixtureId: 1387870 });
  const prediction = await Prediction.findOne({ matchId: 1387870 });

  if (!match || !prediction) {
    console.log('❌ Match ou prediction introuvable');
    process.exit();
  }

  console.log('🎯 SCORE RÉEL:', match.score);
  console.log('🧠 PRONO:', {
    home: prediction.predictedHome,
    away: prediction.predictedAway,
  });

  const points = calculatePoints(
    { home: match.score.home, away: match.score.away },
    { home: prediction.predictedHome, away: prediction.predictedAway }
  );

  console.log('✅ POINTS CALCULÉS:', points);

  prediction.points = points;
  await prediction.save();

  console.log('💾 Points sauvegardés en DB');
  process.exit();
}

test();