import express from 'express';
import routes from './routes/index.js';

const app = express();
app.set('trust proxy', 1);

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(routes);

app.use((req, res) => res.status(404).json({ error: 'Introuvable.' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).json({ error: 'Erreur serveur.' });
});

export default app;
