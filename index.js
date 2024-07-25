import { error } from '#middlewares/errors.middleware.js';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { RouteNotFoundError } from './utils/errors.js';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
import axios from 'axios';

const app = express();

const { PORT = 3000 } = process.env;
const CLIENT_URL = 'http://localhost:5173';

const corsOptions = {
  origin: `${CLIENT_URL}`,
  credentials: true,
};

app.use(morgan('short'));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRoutes);
app.use('/', dataRoutes);

const clientNumberTurboCars = '32831';

app.get('/check-login', async (req, res) => {
  try {
    const cookies = JSON.parse(req.cookies.cookies || '[]');

    const response = await axios.get(
      'https://turbo-cars.net/office/zakaz.asp',
      {
        headers: {
          Cookie: cookies.join('; '),
        },
      }
    );
    const notLogIn = await response.data.includes(clientNumberTurboCars);

    // Проверка, есть ли содержимое в ответе
    if (!notLogIn) {
      throw new Error('Not logged in');
    }

    res.json({ loggedIn: true, data: response.data });
  } catch (error) {
    console.error('Turbocars Check login error:', error.message);
    res.status(500).json({ loggedIn: false, message: 'Not logged in' });
  }
});

app.use(() => {
  throw new RouteNotFoundError();
});

// Errors handler
app.use(error);

const start = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(
        chalk.cyan.italic(
          `Server is running. Use port: ${server.address().port}`
        )
      );
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
