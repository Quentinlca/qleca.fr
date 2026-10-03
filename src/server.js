import app from './app.js';
import { config } from './config.js';

app.listen(config.port, () => {
  console.log(`Serveur démarré sur http://localhost:${config.port}`);
});
