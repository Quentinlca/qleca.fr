# metro-map-site

Node.js 24 + Express 5.

## Démarrage
```bash
cp .env.example .env   # puis modifie DEBUG_PASSWORD
npm install
npm run dev
```

## Route protégée : `/metro_map_api/debug` (GET et POST)
Mot de passe via l'en-tête `X-Debug-Password` ou Basic Auth (nom d'utilisateur libre).

```bash
curl -H "X-Debug-Password: change-moi" http://localhost:3000/metro_map_api/debug
curl -X POST -H "X-Debug-Password: change-moi" -H "Content-Type: application/json" \
     -d '{"hello":"world"}' http://localhost:3000/metro_map_api/debug
```
