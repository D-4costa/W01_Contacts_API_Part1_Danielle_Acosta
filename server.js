import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';

import contactsRoutes from './routes/contacts.js';
import tasksRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';

import { connectDB } from './models/db.js';

import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL('./swagger/swagger.json', import.meta.url))
);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,       
    sameSite: 'none'    
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes); 
app.use('/contacts', contactsRoutes);
app.use('/tasks', tasksRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!'
  });
});

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
