import { Router } from 'express';
import LocationController from '../controllers/locationController';

const locationRouter = Router();
const locationController = new LocationController();

locationRouter.get('/', locationController.index);
locationRouter.post('/', locationController.create);

export default locationRouter;