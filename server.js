import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import contactsRoutes from './routes/contacts.js';
import { connectDB } from './models/db.js';

import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

<<<<<<< HEAD
const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL('./swagger/swagger.json', import.meta.url))
);

app.use(express.json());

app.use('/contacts', contactsRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

=======
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger/swagger.json'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/contacts', contactsRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route
>>>>>>> 440e3b3a7eb157e8b1dead82fb310acf9fb1b5f5
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

<<<<<<< HEAD
=======
// Start server
>>>>>>> 440e3b3a7eb157e8b1dead82fb310acf9fb1b5f5
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs available at /api-docs`);
    });
  })
<<<<<<< HEAD
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
=======
  .catch(err => {
    console.error('Failed to connect to DB', err);
>>>>>>> 440e3b3a7eb157e8b1dead82fb310acf9fb1b5f5
  });
