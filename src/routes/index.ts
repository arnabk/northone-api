import { Application } from 'express';
import healthRoute from './Health';

const aggregateRoutes = (app: Application) => {
  app.use(healthRoute);
};

export default aggregateRoutes;
