// Une seule fonction qui gère GET et POST
export function debugHandler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.json({
        ok: true,
        method: 'GET',
        query: req.query,
        node: process.version,
        uptimeSeconds: Math.round(process.uptime()),
        time: new Date().toISOString(),
      });

    case 'POST':
      // TODO : ta logique de debug ici
      return res.json({
        ok: true,
        method: 'POST',
        received: req.body ?? null,
        time: new Date().toISOString(),
      });

    default:
      res.set('Allow', 'GET, POST');
      return res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}
