import { createHash, timingSafeEqual } from 'node:crypto';

const MAX_FAILS = 10;
const WINDOW_MS = 15 * 60 * 1000;
const fails = new Map(); // ip -> { count, resetAt }

const sha256 = (value) => createHash('sha256').update(value).digest();

// Comparaison en temps constant (hash => même longueur => pas de fuite par timing)
const safeEqual = (a, b) => timingSafeEqual(sha256(a), sha256(b));

// Mot de passe accepté via :
//  - en-tête "X-Debug-Password: ..."
//  - HTTP Basic Auth (n'importe quel nom d'utilisateur) => pratique dans un navigateur
function extractPassword(req) {
  const header = req.get('x-debug-password');
  if (header) return header;

  const auth = req.get('authorization');
  if (auth?.startsWith('Basic ')) {
    const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
    const i = decoded.indexOf(':');
    return i === -1 ? decoded : decoded.slice(i + 1);
  }
  return '';
}

export function requirePassword(expectedPassword) {
  return (req, res, next) => {
    const now = Date.now();
    const entry = fails.get(req.ip);

    if (entry && entry.resetAt > now && entry.count >= MAX_FAILS) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ error: 'Trop de tentatives, réessaie plus tard.' });
    }

    if (safeEqual(extractPassword(req), expectedPassword)) {
      fails.delete(req.ip);
      return next();
    }

    const current = entry && entry.resetAt > now ? entry : { count: 0, resetAt: now + WINDOW_MS };
    current.count += 1;
    fails.set(req.ip, current);

    res.set('WWW-Authenticate', 'Basic realm="metro_map_api debug", charset="UTF-8"');
    return res.status(401).json({ error: 'Mot de passe requis.' });
  };
}
