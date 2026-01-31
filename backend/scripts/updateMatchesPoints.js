const axios = require('axios');

async function updateMatchesPoints() {
  try {
    const res = await axios.post('https://one1sur10.onrender.com/api/matches/update', {});
    console.log('✅ Mise à jour terminée :', res.data.message);
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour des matchs :', err.message);
  }
}

// Lancer la fonction
updateMatchesPoints();