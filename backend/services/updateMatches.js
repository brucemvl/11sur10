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
  stage === "Round of 32" 
  
) {
  pointsSystem = {
    result: 1,
    diff: 2,
    exact: 4,
  };
}
if ( stage === "Round of 16" 
  ) {
  pointsSystem = {
    result: 2,
    diff: 4,
    exact: 6,
  };
}
if ( 
  stage === "Quarter-finals" 
  ) {
  pointsSystem = {
    result: 3,
    diff: 5,
    exact: 7,
  };
}
if ( 
  
  stage === "Semi-finals" 
  ) {
  pointsSystem = {
    result: 5,
    diff: 7,
    exact: 10,
  };
}
if ( 
  
  
  stage === "Final") {
  pointsSystem = {
    result: 6,
    diff: 8,
    exact: 15,
  };
}
   const existingMatch = await Match.findOne({
  fixtureId: m.fixture.id,
});

const matchData = {
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
};

// uniquement à la création
if (!existingMatch) {
  matchData.stage = stage;
  matchData.pointsSystem = pointsSystem;
}

const match = await Match.findOneAndUpdate(
  { fixtureId: m.fixture.id },
  matchData,
  { upsert: true, new: true }
);

    if (status === 'FINISHED' && !match.pointsUpdated) {
  const predictions = await Prediction.find({
    matchId: match.fixtureId,
  });

  for (const p of predictions) {
    const result = calculatePoints(
  { home: match.score.home, away: match.score.away },
  { home: p.predictedHome, away: p.predictedAway },
  match.pointsSystem
);

p.points = result.points;

await p.save();
  }

  match.pointsUpdated = true;
  await match.save();
}
  }

  return 'Matchs mis à jour';
}

module.exports = updateMatches;