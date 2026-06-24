import 'dotenv/config';
import { appConfig } from './app.config.js';
import { app } from './server.js';

// Boot do sistema
app.listen(appConfig.port, () => {
  console.log(`Server is running on http://localhost:${appConfig.port}`);
  console.log(`Environment: ${appConfig.nodeEnv}`);
});

// Ctrl + C
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit();
});
