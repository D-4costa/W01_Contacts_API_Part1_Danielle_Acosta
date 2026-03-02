import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import contactsRoutes from './routes/contacts.js';
import { connectDB } from './models/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => {
  res.redirect('/contacts');
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Contacts API is running successfully on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
  });
