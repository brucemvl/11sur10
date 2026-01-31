const cron = require('node-cron');
const axios = require('axios');
const chalk = require('chalk');

// 🔹 URL de ton backend
const BACKEND_URL = 'https://one1sur10.onrender.com'; // à adapter si besoin

console.log(chalk.blue('🚀 Cron job pour mise à jour des matchs lancé'));

// Fonction pour appeler l'endpoint avec retry
async function updateMatches(retries = 3, delay = 5000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/matches/update`);
      console.log(
        chalk.green(`[${new Date().toISOString()}] ✅ Points recalculés automatiquement :`),
        res.data.message
      );
      return; // succès, on sort de la boucle
    } catch (err) {
      console.error(
        chalk.red(`[${new Date().toISOString()}] ❌ Erreur mise à jour (tentative ${attempt}):`),
        err.message
      );
      if (attempt < retries) {
        console.log(chalk.yellow(`🔄 Nouvelle tentative dans ${delay / 1000}s...`));
        await new Promise((r) => setTimeout(r, delay));
      } else {
        console.error(chalk.red(`💥 Toutes les tentatives ont échoué !`));
      }
    }
  }
}

// Cron toutes les 10 minutes
cron.schedule('*/10 * * * *', async () => {
  const now = new Date().toISOString();
  console.log(chalk.cyan(`${now} ⏱ Début de la mise à jour des matchs...`));
  await updateMatches();
});