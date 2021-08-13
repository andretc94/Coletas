import { Response, Request } from 'express';
import LocationModel from '../models/LocationModel';

import ILocations from '../interfaces/locations';

export default class LocationController {
    public async index(req: Request, res: Response){
        const locationModel = new LocationModel();

        return res.json(await locationModel.getAll());
         
    }

    public async create(req: Request, res: Response){
        const {name, email, whatsapp, city, uf, image, items } = req.body;
        
        const location = {name, email, whatsapp, city, uf, image:'defalt.png'} as ILocations;
        const locationModel = new LocationModel();
        
        const newLocation = await locationModel.create(location, items);

        res.json(newLocation);
        
    }
}