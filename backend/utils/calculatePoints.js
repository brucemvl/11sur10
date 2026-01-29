function calculatePoints(real, predicted) {
  if (
    real.home === predicted.home &&
    real.away === predicted.away
  ) {
    return 3; // score exact
  }

  const realDiff = real.home - real.away;
  const predictedDiff = predicted.home - predicted.away;

  if (realDiff === predictedDiff) {
    return 2; // bon écart
  }

  const realWinner =
    real.home > real.away
      ? 'HOME'
      : real.home < real.away
      ? 'AWAY'
      : 'DRAW';

  const predictedWinner =
    predicted.home > predicted.away
      ? 'HOME'
      : predicted.home < predicted.away
      ? 'AWAY'
      : 'DRAW';

  if (realWinner === predictedWinner) {
    return 1; // bonne équipe
  }

  return 0;
}