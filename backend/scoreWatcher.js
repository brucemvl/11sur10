const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};
const previousEvents = {};
let activeMatches = [];
const finishedMatches = {};
const penaltyNotified = {};


const teamNameNotif = {
    "Morocco" : "Maroc",
      "Ivory Coast" : "Cote d'Ivoire",
      "Algeria" : "Algerie",
       "Paris Saint Germain": "Paris SG",
  "Barcelona" : "FC Barcelone",
  "Central African Republic" : "Centrafrique",
  "Cape Verde Islands" : "Cap Vert",
}

const scoreMessages = {
  opening: [
    (team) => `⚽ ${team} ouvre le score !`,
    (team) => `⚽ Ouverture du score pour ${team} !`,
    (team) => `⚽ Premier but du match pour ${team} !`,
  ],
  equalizer: [
    (team) => `⚽ Égalisation de ${team} !`,
    (team) => `⚽ ${team} remet les compteurs à zéro !`,
    (team) => `⚽ ${team} revient au score !`,
  ],
  scoreUpdate: [
    (home, away, h, a) => `⚽ Nouveau score : ${home} ${h} - ${a} ${away}`,
  ],
};

function pickRandom(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}


// 🔁 Rafraîchit la liste des matchs à suivre (toutes les 5 min)
async function refreshActiveMatches() {
  try {
    console.log("🔄 Rafraîchissement des matchs à suivre...");

    // 🔹 1. Récupérer les équipes suivies
    const groupedTokens = await PushToken.aggregate([
      { $group: { _id: '$teamId', tokens: { $push: '$token' } } }
    ]);

    const followedTeamIds = new Set(
      groupedTokens.map(g => Number(g._id)).filter(Boolean)
    );

    if (followedTeamIds.size === 0) {
      activeMatches = [];
      return;
    }

    // 🔹 2. UN SEUL appel API : tous les matchs live
    const { data } = await axios.get(
      'https://v3.football.api-sports.io/fixtures?live=all',
      {
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );

    const liveMatches = data.response.filter(match =>
      ['1H', '2H', 'HT', 'ET', 'P'].includes(match.fixture.status.short)
    );

    const newActiveMatches = [];

    // 🔹 3. Filtrer uniquement les matchs qui concernent une équipe suivie
    for (const match of liveMatches) {
      const matchId = match.fixture.id;
      if (finishedMatches[matchId]) continue;

      const homeId = match.teams.home.id;
      const awayId = match.teams.away.id;

      if (followedTeamIds.has(homeId)) {
        newActiveMatches.push({ matchId, teamId: homeId });
      }

      if (followedTeamIds.has(awayId)) {
        newActiveMatches.push({ matchId, teamId: awayId });
      }
    }

    // 🔹 4. Supprimer les doublons
    activeMatches = Array.from(
      new Map(
        newActiveMatches.map(m => [`${m.matchId}-${m.teamId}`, m])
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
    const tokensByTeam = Object.fromEntries(
      tokenGroups.map(g => [String(g._id), g.tokens])
    );

    const matchTokens = {}; // clé = matchId, valeur = Set de tokens

for (const { matchId, teamId } of activeMatches) {
  const tokens = tokensByTeam[teamId] || [];
  if (!matchTokens[matchId]) matchTokens[matchId] = new Set();
  tokens.forEach(t => matchTokens[matchId].add(t));
}


    for (const matchId of Object.keys(matchTokens)) {
  const tokens = Array.from(matchTokens[matchId]);
      if (tokens.length === 0) continue;

      const { data } = await axios.get(
        `https://v3.football.api-sports.io/fixtures?id=${matchId}`,
        {
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        }
      );

      const match = data.response?.[0];
      if (!match) continue;

      const status = match.fixture.status.short;
      const homeTeam = teamNameNotif[match.teams.home.name] || match.teams.home.name;
      const awayTeam = teamNameNotif[match.teams.away.name] || match.teams.away.name;
      const homeGoals = match.goals.home;
      const awayGoals = match.goals.away;

      // 🎯 Tirs au but
if (status === 'P' && !penaltyNotified[matchId]) {
  await sendPushNotification(tokens, {
    title: '🎯 Tirs au but',
    body: `${homeTeam} vs ${awayTeam} – place aux penalties !`,
    data: { screen: 'FicheMatch', matchId },
  });

  penaltyNotified[matchId] = true;
}

// Match terminé
if (['FT', 'AET', 'PEN'].includes(status)) {
  if (!finishedMatches[matchId]) {

    // Déterminer le vainqueur
    let winner = null;
    if (homeGoals > awayGoals) winner = homeTeam;
    else if (awayGoals > homeGoals) winner = awayTeam;

    let bodyMessage = `Score final : ${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`;
    if (status === 'PEN' && winner) {
      bodyMessage = `🏆 Vainqueur aux tirs au but : ${winner} ! (${homeGoals}-${awayGoals})`;
    }

    await sendPushNotification(tokens, {
      title: '⏱️ Match terminé',
      body: bodyMessage,
      data: { screen: 'FicheMatch', matchId },
    });

    finishedMatches[matchId] = true;
  }

  delete previousScores[matchId];
  delete penaltyNotified[matchId];

  // Nettoyer events
  Object.keys(previousEvents).forEach(key => {
    if (key.startsWith(`${matchId}-`)) delete previousEvents[key];
  });

  activeMatches = activeMatches.filter(m => m.matchId !== matchId);
  continue;
}

      // ⛔ On ne traite que les matchs en cours
      if (!['1H', '2H', 'HT', 'ET'].includes(status)) continue;

      const prev = previousScores[matchId] ?? { home: null, away: null };
      const scoreChanged = prev.home !== homeGoals || prev.away !== awayGoals;

      // 🚫 Évite notif 0-0 au premier passage
      if (scoreChanged && !(prev.home === null && homeGoals === 0 && awayGoals === 0)) {

        const prevTotal = (prev.home ?? 0) + (prev.away ?? 0);
        const currentTotal = homeGoals + awayGoals;

        if (currentTotal < prevTotal) {
    await sendPushNotification(tokens, {
      title:  `${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`,
      body: '❌ VAR - But annulé!',
      data: { screen: 'FicheMatch', matchId },
    });

    previousScores[matchId] = { home: homeGoals, away: awayGoals };
    continue; // ⛔ très important
  }
        let message = `⚽ Nouveau score : ${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`;

        

        // ⚽ Ouverture du score
        if (prevTotal === 0 && currentTotal === 1) {
          const scorer = homeGoals > awayGoals ? homeTeam : awayTeam;
          message = pickRandom(scoreMessages.opening)(scorer);
        }

        // ⚖️ Égalisation
        if (currentTotal > prevTotal && homeGoals === awayGoals) {
          const equalizer = homeGoals > prev.home ? homeTeam : awayTeam;
          message = pickRandom(scoreMessages.equalizer)(equalizer);
        }

        await sendPushNotification(tokens, {
          title: `${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`,
          body: message,
          data: { screen: 'FicheMatch', matchId },
        });

        console.log(`📲 Notification score envoyée (${matchId})`);
        previousScores[matchId] = { home: homeGoals, away: awayGoals };
      }

      // 🧾 ÉVÉNEMENTS (buts, rouges)
      for (const event of match.events || []) {
        const { player, team, time, type, detail } = event;
        if (!player?.name || !team?.name) continue;

        const eventKey = `${matchId}-${type}-${detail || ''}-${team.name}-${player.name}`.toLowerCase();
        if (previousEvents[eventKey]) continue;

        const minute = time?.elapsed ?? '?';
        let body = null;

        if (type === 'Goal') {
          body = `⚽ ${minute}e - But de ${player.name} (${teamNameNotif[team.name] || team.name})`;
          if (detail === 'Own Goal') body = `😱 ${minute}e - CSC de ${player.name}`;
          if (detail === 'Penalty') body = `⚽ ${minute}e - ${player.name} marque sur penalty`;
          if (detail === 'Missed Penalty') body = `❌ ${minute}e - Penalty raté de ${player.name}`;
        }

        if (type === 'Card' && detail === 'Red Card') {
          body = `🟥 ${minute}e - Carton rouge pour ${player.name}`;
        }

        if (body) {
          await sendPushNotification(tokens, {
            title: `${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`,
            body,
            data: { matchId },
          });

          previousEvents[eventKey] = true;
          console.log(`📲 Événement envoyé : ${body}`);
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