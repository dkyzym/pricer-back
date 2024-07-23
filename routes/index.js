import authRouter from './auth.js';
import dataRouter from './data.js';

export const routes = (app) => {
  app.use('/', authRouter);
  app.use('/data', dataRouter);
};
