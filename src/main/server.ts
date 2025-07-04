import express from 'express';
import * as dotenv from 'dotenv';
import routes from '../presentation/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../infrastructure/swagger/swagger.json';
import sequelize, { connectWithRetry } from '../infrastructure/database/config/database';
import httpLogger from '../infrastructure/middlewares/httpLogger';
import logger from '../infrastructure/log/logger';

dotenv.config();

const app = express();
app.disable('etag');

app.use(express.json());
app.use(httpLogger);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

connectWithRetry().then(() => {
  sequelize.sync({ alter: true }).then(() => {
    logger.info('Database synced');
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  });
}).catch((err) => {
  logger.error('Failed to connect to the database after retries', err);
  process.exit(1);
});
