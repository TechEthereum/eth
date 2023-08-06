import { databaseConfig } from './database';
import { serverConfig } from './server';

export default () => ({
  server: serverConfig(),
  database: databaseConfig(),
});
