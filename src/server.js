import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { contactsRouter } from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';

dotenv.config();
const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Mongo connection successfully established!',
    });
  });

  app.use(contactsRouter);

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Contact not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
