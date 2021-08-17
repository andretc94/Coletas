import { Response, Request, NextFunction } from "express";
import LocationModel from "../models/LocationModel";

import ILocations from "../interfaces/locations";

export default class LocationController {
  public async index(req: Request, res: Response) {
    const locationModel = new LocationModel();

    const { city, uf, items } = req.query;

    if(city && uf && items){
        const parseItems = String(items).split(',').map(item=> Number(item.trim()));
        res.json(await locationModel.getWithFilter(city as string , uf as string, parseItems as number[]));
    }else{
        return res.json(await locationModel.getAll());
    }

  }

  public async create(req: Request, res: Response) {
    const { name, email, whatsapp, city, uf, image, items } = req.body;

    const location = {
      name,
      email,
      whatsapp,
      city,
      uf,
      image: "defalt.png",
    } as ILocations;
    const locationModel = new LocationModel();

    const newLocation = await locationModel.create(location, items);

    res.json(newLocation);
  }

  public async update(req: Request, res: Response) {
    const locationModel = new LocationModel();
    const { id } = req.params;
    const image = req.file?.filename;

    const location = await locationModel.update(id as string, image as string);

    return res.json(location);
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    const locationModel = new LocationModel();
    const { id } = req.params;

    const location = await locationModel.findById(id as string);
    if(!location){
      return res.json({message: "Location not found!"});
    }
    next();
  }
}
