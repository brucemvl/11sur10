const cron = require('node-cron');
const updateMatches = require('../services/updateMatches');

console.log('⏱ Cron updateMatches initialisé');

cron.schedule('*/10 * * * *', async () => {
  console.log(`${new Date().toISOString()} ⏱ Mise à jour matchs`);
  try {
    await updateMatches();
    console.log('✅ Matchs mis à jour');
  } catch (err) {
    console.error('❌ Erreur cron update:', err.message);
  }
});