import express from 'express';
import * as dotenv from 'dotenv';
import routes from '../presentation/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../infrastructure/swagger/swagger.json';
import sequelize from '../infrastructure/database/config/database';

dotenv.config();

const app = express();
app.use(express.json());


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
