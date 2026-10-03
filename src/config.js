const { PORT = '3000', DEBUG_PASSWORD } = process.env;

if (!DEBUG_PASSWORD) {
  console.error('DEBUG_PASSWORD manquant : copie .env.example vers .env et renseigne-le.');
  process.exit(1);
}

export const config = {
  port: Number(PORT),
  debugPassword: DEBUG_PASSWORD,
};
