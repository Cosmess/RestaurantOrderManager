import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import logger from '../../log/logger';

dotenv.config();

function getFixedDatabaseUrl(): string {
  const originalUrl = process.env.DATABASE_URL;

  if (!originalUrl) {
    throw new Error('DATABASE_URL not defined in environment variables');
  }

  if (originalUrl.includes('localhost') || originalUrl.includes('127.0.0.1') || originalUrl.includes('::1')) {
    const isInDocker = process.env.DOCKER_ENV === 'true' || process.env.NODE_ENV === 'production';
    if (isInDocker) {
      logger.warn('Detected Docker environment. Replacing "localhost" with "db" in DATABASE_URL');
      return originalUrl.replace('localhost', 'db').replace('127.0.0.1', 'db').replace('::1', 'db');
    }
  }

  return originalUrl;
}

const sequelize = new Sequelize(getFixedDatabaseUrl(), {
  dialect: 'postgres',
  logging: (msg) => logger.debug(msg)
});

export async function connectWithRetry(retries = 5, delay = 3000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.info(`Trying to connect to DB (attempt ${attempt}/${retries})...`);
      await sequelize.authenticate();
      logger.info('Database connection established.');
      break;
    } catch (error) {
      logger.error(`Database connection failed (attempt ${attempt}): ${error}`);
      if (attempt === retries) {
        throw error;
      }
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

export default sequelize;
