let state = { updatedAt: null, data: null, error: null };

export const getState = () => state;

async function refresh() {
  try {
    const calculationStartedAt = performance.now();

    
    // TODO : ta logique (appel d'une API, calcul, lecture de fichier...)
    const data = {
      compteur: (state.data?.compteur ?? 0) + 1,
      tempsDeCalculMs: Number((performance.now() - calculationStartedAt).toFixed(2)),
    };

    state = { updatedAt: new Date().toISOString(), data, error: null };
  } catch (err) {
    console.error('Mise à jour échouée :', err.message);
    state = { ...state, error: err.message }; // on garde les dernières bonnes données
  }
}

export function startUpdater(intervalMs = 30_000) {
  let timer;
  let stopped = false;

  const loop = async () => {
    await refresh();
    if (!stopped) timer = setTimeout(loop, intervalMs);
  };
  loop();

  return () => {
    stopped = true;
    clearTimeout(timer);
  };
}