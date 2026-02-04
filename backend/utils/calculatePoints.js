module.exports = function calculatePoints(realScore, predictedScore) {
  const realHome = Number(realScore?.home);
  const realAway = Number(realScore?.away);
  const predictedHome = Number(predictedScore?.home);
  const predictedAway = Number(predictedScore?.away);

  if (
    Number.isNaN(realHome) ||
    Number.isNaN(realAway) ||
    Number.isNaN(predictedHome) ||
    Number.isNaN(predictedAway)
  ) {
    return 0;
  }

  // 🎯 Score exact
  if (realHome === predictedHome && realAway === predictedAway) {
    return 3;
  }

  const realDiff = realHome - realAway;
  const predictedDiff = predictedHome - predictedAway;

  // 🎯 Bon écart (différence exacte)
  if (realDiff === predictedDiff) {
    return 2;
  }

  // ✅ Bon résultat (1N2)
  if (
    (realDiff > 0 && predictedDiff > 0) ||
    (realDiff < 0 && predictedDiff < 0) ||
    (realDiff === 0 && predictedDiff === 0)
  ) {
    return 1;
  }

  return 0;
};