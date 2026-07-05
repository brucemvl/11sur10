const mongoose = require("mongoose");
const Prediction = require("../models/Prediction");
const Match = require("../models/Match");
require("dotenv").config();

function calculatePoints(pred, match) {
  const system = match.pointsSystem || {
    result: 1,
    diff: 2,
    exact: 3
  };

  const ph = Number(pred.predictedHome);
  const pa = Number(pred.predictedAway);
  const rh = Number(match.score.home);
  const ra = Number(match.score.away);

  // 🎯 exact score
  if (ph === rh && pa === ra) {
    return { points: system.exact, type: "exact" };
  }

  const pronoDiff = ph - pa;
  const realDiff = rh - ra;

  // ⚖️ diff
  if (pronoDiff === realDiff) {
    return { points: system.diff, type: "diff" };
  }

  // ✅ 1N2 result
  const pronoWinner =
    pronoDiff > 0 ? "HOME" : pronoDiff < 0 ? "AWAY" : "DRAW";

  const realWinner =
    realDiff > 0 ? "HOME" : realDiff < 0 ? "AWAY" : "DRAW";

  if (pronoWinner === realWinner) {
    return { points: system.result, type: "result" };
  }

  return { points: 0, type: "none" };
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

   await Prediction.updateMany({}, { $unset: { points: "" } });
    console.log("🧹 Points supprimés");

  const predictions = await Prediction.find();
  const matches = await Match.find({ status: "FINISHED" });

  const matchMap = {};
  matches.forEach(m => {
    matchMap[m.fixtureId] = m;
  });

  let updated = 0;
  let skipped = 0;

  for (const p of predictions) {
    const match = matchMap[p.matchId];
    if (!match) {
      skipped++;
      continue;
    }

    // 🛑 PROTECTION : ne pas recalculer si déjà bon
    if (typeof p.points === "number") {
      console.log(`Skip ${p._id} (already has points: ${p.points})`);
      skipped++;
      continue;
    }

    const result = calculatePoints(p, match);

    await Prediction.updateOne(
      { _id: p._id },
      {
        $set: {
          points: result.points
        }
      }
    );

    updated++;
    console.log(
      `Prediction ${p._id} => ${result.points} pts (${result.type})`
    );
  }

  console.log("========== DONE ==========");
  console.log("Updated :", updated);
  console.log("Skipped :", skipped);

  process.exit();
}

run();