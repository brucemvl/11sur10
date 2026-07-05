const mongoose = require("mongoose");
const Prediction = require("../models/Prediction");
const Match = require("../models/Match");
require("dotenv").config();

function calculatePoints(pred, match) {
  if (!match || match.status !== "FINISHED") {
    return { points: 0 };
  }

  const ph = pred.predictedHome;
  const pa = pred.predictedAway;
  const rh = match.score.home;
  const ra = match.score.away;

  if (ph === rh && pa === ra) return { points: 3 };
  if (ph - pa === rh - ra) return { points: 2 };

  const prono = ph > pa ? "HOME" : ph < pa ? "AWAY" : "DRAW";
  const real = rh > ra ? "HOME" : rh < ra ? "AWAY" : "DRAW";

  if (prono === real) return { points: 1 };

  return { points: 0 };
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const predictions = await Prediction.find();
  const matches = await Match.find({ status: "FINISHED" });

  const matchMap = {};
  matches.forEach(m => {
    matchMap[m.fixtureId] = m;
  });

  let updated = 0;

  for (const p of predictions) {
    const match = matchMap[p.matchId];
    if (!match) continue;

    const result = calculatePoints(p, match);

    await Prediction.updateOne(
      { _id: p._id },
      { $set: { points: result.points } }
    );

    updated++;

    console.log(`Prediction ${p._id} => ${result.points} pts`);
  }

  console.log("Migration terminée :", updated);
  process.exit();
}

run();