const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};
const previousEvents = {};
let activeMatches = [];

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
    const tokensByTeam = Object.fromEntries(
      tokenGroups.map(g => [String(g._id), g.tokens])
    );

    for (const { matchId, teamId } of activeMatches) {
      const tokens = tokensByTeam[String(teamId)] || [];
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

      // 🏁 Match terminé
      if (status === 'FT') {
        await sendPushNotification(tokens, {
          title: '⏱️ Match terminé',
          body: `Score final : ${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`,
          data: { screen: 'FicheMatch', matchId },
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
        let message = `⚽ Nouveau score : ${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`;

        const prevTotal = (prev.home ?? 0) + (prev.away ?? 0);
        const currentTotal = homeGoals + awayGoals;

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
          body = `⚽ ${minute}e - ${player.name} (${teamNameNotif[team.name] || team.name})`;
          if (detail === 'Own Goal') body = `😱 ${minute}e - CSC de ${player.name}`;
          if (detail === 'Penalty') body = `⚽ ${minute}e - Penalty de ${player.name}`;
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