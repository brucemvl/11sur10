async function startCrons() {
  await import('./updateMatches.cron.js');
}

module.exports = startCrons;