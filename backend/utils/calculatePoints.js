module.exports = function calculatePoints(realScore, predictedScore) {
  const { home: realHome, away: realAway } = realScore;
  const { home: predictedHome, away: predictedAway } = predictedScore;

  if (
    realHome === null ||
    realAway === null ||
    predictedHome === null ||
    predictedAway === null
  ) {
    return 0;
  }

  // 🎯 Score exact
  if (realHome === predictedHome && realAway === predictedAway) {
    return 3;
  }

  // ✅ Bon résultat (1N2)
  const realDiff = realHome - realAway;
  const predictedDiff = predictedHome - predictedAway;

  if (
    (realDiff > 0 && predictedDiff > 0) ||
    (realDiff < 0 && predictedDiff < 0) ||
    (realDiff === 0 && predictedDiff === 0)
  ) {
    return 1;
  }

  return 0;
};