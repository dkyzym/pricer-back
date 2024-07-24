import authRouter from './auth.js';
import dataRouter from './data.js';
import isAuthRouter from './isAuth.js';

export const routes = (app) => {
  app.use('/', authRouter);
  app.use('/', isAuthRouter);
  app.use('/data', dataRouter);
};
