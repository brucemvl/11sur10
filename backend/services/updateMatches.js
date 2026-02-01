const Match = require('../models/Match');
const Prediction = require('../models/Prediction');
const axios = require('axios');
const calculatePoints = require('../utils/calculatePoints');

async function updateMatches() {
  const { data } = await axios.get(
    'https://v3.football.api-sports.io/fixtures?league=61&season=2025',
    {
      headers: {
        'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
        'x-rapidapi-host': process.env.FOOTBALL_API_HOST,
      },
    }
  );

  for (const m of data.response) {
    const isFinished = m.fixture.status.short === 'FT';

    const match = await Match.findOneAndUpdate(
      { fixtureId: m.fixture.id },
      {
        homeTeam: m.teams.home.name,
        awayTeam: m.teams.away.name,
        homeLogo: m.teams.home.logo,
    awayLogo: m.teams.away.logo,
        kickoff: m.fixture.date,
        score: {
          home: m.goals.home,
          away: m.goals.away,
        },
        status: isFinished ? 'FINISHED' : 'SCHEDULED',
      },
      { upsert: true, new: true }
    );

    if (isFinished && !match.pointsUpdated) {
      const predictions = await Prediction.find({
        matchId: match.fixtureId,
      });

      for (const p of predictions) {
        p.points = calculatePoints(
          { home: match.score.home, away: match.score.away },
          { home: p.predictedHome, away: p.predictedAway }
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