import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import contactsRoutes from './routes/contacts.js';
import tasksRoutes from './routes/tasks.js'; // NUEVO
import { connectDB } from './models/db.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL('./swagger/swagger.json', import.meta.url))
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/contacts', contactsRoutes);
app.use('/tasks', tasksRoutes); // NUEVO

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route redirects to Swagger
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Start server after DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs available at /api-docs`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });
