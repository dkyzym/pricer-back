import { error } from '#middlewares/errors.middleware.js';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { RouteNotFoundError } from './utils/errors.js';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';

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

app.use(() => {
  throw new RouteNotFoundError();
});

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
