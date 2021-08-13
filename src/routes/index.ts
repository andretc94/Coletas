import  express  from 'express';
import { Router } from 'express';
import itemsRouter from './items.routes'
import locationRouter from './location.routes';


const routes = Router();

routes.use(express.json());

routes.use('/items', itemsRouter)
routes.use('/location', locationRouter);

export default routes;