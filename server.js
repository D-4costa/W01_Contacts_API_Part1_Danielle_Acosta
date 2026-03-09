import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import contactsRoutes from './routes/contacts.js';
import { connectDB } from './models/db.js';

import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger/swagger.json'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/contacts', contactsRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs available at /api-docs`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
  });
