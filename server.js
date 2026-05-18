import express from 'express';
import contactsRoutes from './routes/contacts.js';
import { initDb } from './db/connect.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

dotenv.config();

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/contacts', contactsRoutes);

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});