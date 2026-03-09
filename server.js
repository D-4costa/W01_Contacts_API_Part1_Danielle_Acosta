import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import contactsRoutes from './routes/contacts.js';
import { connectDB } from './models/db.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json' assert { type: "json" };

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', contactsRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Contacts API running on port ${PORT}`);
      console.log(`Swagger docs available at /api-docs`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
  });
