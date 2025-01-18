import { initMongoConnection } from './db/initMongoConnection';
import { setupServer } from './server';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
