import app from './app.js';
import { config } from './config.js';
import { startUpdater } from './services/metroState.js';

const stopUpdater = startUpdater(5_000); // toutes les 5 s

const server = app.listen(config.port, () => {
  console.log(`Serveur démarré sur http://localhost:${config.port}`);
});

process.on('SIGTERM', () => {
  stopUpdater();
  server.close(() => process.exit(0));
});