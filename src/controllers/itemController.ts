import { Request, Response } from 'express'
import ItemModel from '../models/ItemModel';
import Items from '../interfaces/items';

export default class ItemController {
    public async index(req:Request, res:Response) {
        const itemModel = new ItemModel();
        
        const items:Items[] = await itemModel.getAll();
        
        const parsedItems = items.map((item: Items) => (
            {
                id:  item.id,
                name: item.name,
                image: `http://localhost:3333/items/upload/${item.image}`
            }
        ));
        
        res.json(parsedItems);
    }
}