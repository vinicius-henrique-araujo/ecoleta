import express from 'express';

import PointsController from './controllers/PointsController';
 import ItensControllers from './controllers/ItensControllers'



const routes = express.Router();
const pointsController = new PointsController();
const itensControllers =  new ItensControllers();

routes.get('/itens',itensControllers.index);
routes.post('/points', pointsController.create);
routes.get('/points/', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;