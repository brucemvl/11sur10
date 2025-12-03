const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};
const previousEvents = {};
let activeMatches = [];

import { teamName } from '../src/datas/teamNames';

// 🔁 Rafraîchit la liste des matchs à suivre (toutes les 5 min)
async function refreshActiveMatches() {
  try {
    console.log("🔄 Rafraîchissement des matchs à suivre...");
    activeMatches = [];

    const groupedTokens = await PushToken.aggregate([
      { $group: { _id: '$teamId', tokens: { $push: '$token' } } }
    ]);

    for (const { _id: teamId, tokens } of groupedTokens) {
      if (!teamId) continue;

      const { data } = await axios.get(
        `https://v3.football.api-sports.io/fixtures?team=${teamId}&next=5`,
        {
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        }
      );

      const matches = data.response;
      const liveMatches = matches.filter(match =>
        ['1H', '2H', 'HT', 'ET', 'P'].includes(match.fixture.status.short)
      );

      liveMatches.forEach(match => {
        const matchExists = activeMatches.some(
          m => m.matchId === match.fixture.id && m.teamId === teamId
        );
        if (!matchExists) {
          activeMatches.push({ matchId: match.fixture.id, teamId });
        }
      });

      // Fallback si aucun match actif
      if (liveMatches.length === 0) {
        const { data: liveData } = await axios.get(
          `https://v3.football.api-sports.io/fixtures?team=${teamId}&live=all`,
          {
            headers: {
              'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          }
        );

        const fallbackLiveMatches = liveData.response.filter(match =>
          ['1H', '2H', 'HT', 'ET', 'P'].includes(match.fixture.status.short)
        );

        fallbackLiveMatches.forEach(match => {
          activeMatches.push({ matchId: match.fixture.id, teamId });
        });
      }
    }

    // ✅ Supprimer les doublons
    activeMatches = Array.from(
      new Map(
        activeMatches.map(m => [`${m.matchId}-${m.teamId}`, m])
      ).values()
    );

    console.log(`✅ ${activeMatches.length} match(s) actif(s) à surveiller.`);
  } catch (err) {
    console.error('❌ Erreur dans refreshActiveMatches:', err.message);
  }
}

// ✅ Vérifie les scores et événements des matchs actifs
async function checkMatchScore() {
  try {
    if (activeMatches.length === 0) {
      console.log("⏸️ Aucun match actif à surveiller.");
      return;
    }

    console.log("🎯 Liste des matchs actifs :", activeMatches);

    const tokenGroups = await PushToken.aggregate([
      { $group: { _id: '$teamId', tokens: { $push: '$token' } } }
    ]);
    const tokensByTeam = Object.fromEntries(tokenGroups.map(g => [String(g._id), g.tokens]));

    const teamMatches = {};
    for (const { matchId, teamId } of activeMatches) {
      if (!teamMatches[teamId]) teamMatches[teamId] = [];
      teamMatches[teamId].push(matchId);
    }

    for (const teamId of Object.keys(teamMatches)) {
      const matchIds = teamMatches[teamId];
      const tokens = tokensByTeam[teamId] || [];

      for (const matchId of matchIds) {
        const { data } = await axios.get(
          `https://v3.football.api-sports.io/fixtures?id=${matchId}`,
          {
            headers: {
              'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          }
        );

        const match = data.response[0];
        if (!match) continue;

        const status = match.fixture.status.short;
        if (!['1H', '2H', 'HT', 'ET'].includes(status)) continue;

        const homeTeam = match.teams.home.name;
        const awayTeam = match.teams.away.name;
        const currentHomeGoals = match.goals.home;
        const currentAwayGoals = match.goals.away;

        const prevScore = previousScores[matchId] || { home: null, away: null };

        if (prevScore.home !== currentHomeGoals || prevScore.away !== currentAwayGoals) {
          const isFirstCheck = prevScore.home === null && prevScore.away === null;
const scoreChanged = prevScore.home !== currentHomeGoals || prevScore.away !== currentAwayGoals;

// Évite d'envoyer une notif 0-0 au premier check
if (scoreChanged && !(isFirstCheck && currentHomeGoals === 0 && currentAwayGoals === 0)) {
  const scoreMsg = `⚽ Nouveau score : ${teamName[homeTeam] || homeTeam} ${currentHomeGoals} - ${currentAwayGoals} ${teamName[awayTeam] || awayTeam}`;
  console.log(scoreMsg);

  await sendPushNotification(tokens, {
    title: `${teamName[homeTeam] || homeTeam} vs ${teamName[awayTeam] || awayTeam}`,
    body: scoreMsg,
    data: {
      screen: 'FicheMatch',
      matchId,
    },
  });

  console.log(`📲 Notification envoyée à ${tokens.length} token(s).`);

  previousScores[matchId] = {
    home: currentHomeGoals,
    away: currentAwayGoals,
  };
}
        }

        const events = match.events || [];
for (const event of events) {
  const { player, team, time, type, detail } = event;
  if (!player?.name || !team?.name) continue;

  // 🧩 Clé unique stable (ignore minute, gère null/undefined)
const safeDetail = detail || '';
const eventKey = `${matchId}-${type}-${safeDetail}-${team.name}-${player.name}`.toLowerCase().trim();

if (previousEvents[eventKey]) continue;

  const playerName = player.name;
  const teamName = team.name;
  const minute = time?.elapsed ?? '?';

  if (type === 'Goal') {
    let goalMsg = `⚽ ${minute}e - But de ${playerName} pour ${teamName[teamName] || teamName}`;
    if (detail === 'Own Goal') {
      goalMsg = `😱 ${minute}e - CSC de ${playerName} (${teamName[teamName] || teamName})`;
    } else if (detail === 'Penalty') {
      goalMsg = `⚽ ${minute}e - But de ${playerName} sur penalty!`;
    } else if (detail === 'Missed Penalty') {
      goalMsg = `⚽ ${minute}e - Penalty manqué de ${playerName}!! (${teamName[teamName] || teamName})`;
    }

    console.log(goalMsg);
    await sendPushNotification(tokens, {
      title: `${teamName[homeTeam] || homeTeam} ${currentHomeGoals} - ${currentAwayGoals} ${teamName[awayTeam] || awayTeam}`,
      body: goalMsg,
      data: { matchId },
    });

    previousEvents[eventKey] = true; // ✅ Marque comme déjà traité
  }

  if (type === 'Card' && detail === 'Red Card') {
    const redCardMsg = `🟥 ${minute}e - Carton rouge pour ${playerName} (${teamName[teamName] || teamName})`;

    console.log(redCardMsg);
    await sendPushNotification(tokens, {
      title: `${teamName[homeTeam] || homeTeam} vs ${teamName[awayTeam] || awayTeam}`,
      body: redCardMsg,
      data: { matchId },
    });

    previousEvents[eventKey] = true; // ✅ Marque comme déjà traité
  }
}
      }
    }
  } catch (err) {
    console.error('❌ Erreur dans checkMatchScore:', err.message);
  }
}

// 🕓 Cron jobs
cron.schedule('*/5 * * * *', refreshActiveMatches);      // Rafraîchit les matchs toutes les 5 minutes
cron.schedule('*/30 * * * * *', checkMatchScore);        // Vérifie les scores toutes les 30 secondes

// ▶️ Démarrage initial
(async () => {
  await refreshActiveMatches();                          // Charge les matchs dès le lancement
  setTimeout(() => checkMatchScore(), 10000);            // Démarre la première vérification après 10s
})();