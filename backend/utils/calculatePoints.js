module.exports = function calculatePoints(
  realScore,
  predictedScore,
  pointsSystem = {
    result: 1,
    diff: 2,
    exact: 3,
  }
) {  const realHome = Number(realScore?.home);
  const realAway = Number(realScore?.away);
  const predictedHome = Number(predictedScore?.home);
  const predictedAway = Number(predictedScore?.away);

  if (
    Number.isNaN(realHome) ||
    Number.isNaN(realAway) ||
    Number.isNaN(predictedHome) ||
    Number.isNaN(predictedAway)
  ) {
    return { points: 0, type: null };
  }

  // 🎯 Score exact
  if (realHome === predictedHome && realAway === predictedAway) {
    return { points: pointsSystem.exact, type: "exact" };
  }

  const realDiff = realHome - realAway;
  const predictedDiff = predictedHome - predictedAway;

  // 🎯 Bon écart
  if (realDiff === predictedDiff) {
    return { points: pointsSystem.diff, type: "diff" };
  }

  // ✅ Bon résultat
  if (
    (realDiff > 0 && predictedDiff > 0) ||
    (realDiff < 0 && predictedDiff < 0) ||
    (realDiff === 0 && predictedDiff === 0)
  ) {
    return { points: pointsSystem.result, type: "result" };
  }

  return { points: 0, type: null };
};