import { Request, Response, NextFunction } from 'express';
import LocationModel from '../models/LocationModel';

const multerValidate = async (req: Request, res: Response, next: NextFunction) => {
    const locationModel = new LocationModel();
    const { id } = req.params;

    const location = await locationModel.findById(id as string);
    if(!location){
      return res.json({message: "Location not found!"});
    }
    next();
};

export default { multerValidate };