import express from 'express';
import contactsRoutes from './routes/contacts.js';
import { initDb } from './db/connect.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Main Routes
app.use('/contacts', contactsRoutes);

// Initialize DB and start server
initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});