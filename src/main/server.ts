import express from 'express';
import * as dotenv from 'dotenv';
import routes from '../presentation/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../infrastructure/swagger/swagger.json';
import sequelize from '../infrastructure/database/config/database';
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

sequelize.sync({ alter: true }).then(() => {
  logger.info('Database synced');
  app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server running on port ${process.env.PORT}`);
  });
});
