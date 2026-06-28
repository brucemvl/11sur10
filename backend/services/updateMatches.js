const Match = require('../models/Match');
const Prediction = require('../models/Prediction');
const axios = require('axios');
const calculatePoints = require('../utils/calculatePoints');

async function updateMatches() {
  const { data } = await axios.get(
    'https://v3.football.api-sports.io/fixtures?league=1&season=2026',
    {
      headers: {
        'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
        'x-rapidapi-host': process.env.FOOTBALL_API_HOST,
      },
    }
  );

  for (const m of data.response) {
const statusShort = m.fixture.status.short;

let status = 'SCHEDULED';
if (['FT', 'AET'].includes(statusShort)) {
  status = 'FINISHED';
} else if (['1H', 'HT', '2H'].includes(statusShort)) {
  status = 'LIVE';
}

const stage = m.league.round;

let pointsSystem = {
  result: 1,
  diff: 2,
  exact: 3,
};

if (
  stage === "Round of 16" ||
  stage === "Quarter-finals" ||
  stage === "Semi-finals" ||
  stage === "Final"
) {
  pointsSystem = {
    result: 2,
    diff: 3,
    exact: 5,
  };
}
    const match = await Match.findOneAndUpdate(
      { fixtureId: m.fixture.id },
      {
        homeTeam: m.teams.home.name,
        awayTeam: m.teams.away.name,
        homeLogo: m.teams.home.logo,
    awayLogo: m.teams.away.logo,
        kickoff: m.fixture.date,
        score: {
          home: m.score.fulltime.home,
          away: m.score.fulltime.away,
        },
        status,
        stage,
    pointsSystem,
      },
      { upsert: true, new: true }
    );

    if (status === 'FINISHED' && !match.pointsUpdated) {
  const predictions = await Prediction.find({
    matchId: match.fixtureId,
  });

  for (const p of predictions) {
    p.points = calculatePoints(
      { home: match.score.home, away: match.score.away },
      { home: p.predictedHome, away: p.predictedAway },
      match.pointsSystem
    );
    await p.save();
  }

  match.pointsUpdated = true;
  await match.save();
}
  }

  return 'Matchs mis à jour';
}

module.exports = updateMatches;