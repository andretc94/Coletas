import knex from '../database/connection'
import IItems from '../interfaces/items';
import ILocations from '../interfaces/locations';

export default class LocationModel {
    public async getAll(){
        return await knex('location').select();
    }

    public async create(location: ILocations, items: IItems[]){
        const transaction = await knex.transaction();

        const locationsExists = await transaction('location')
            .select()
            .where({name: location.name})
            .first();
        
        if(locationsExists){
            transaction.rollback();
            return {message: "location exists!"};
        }

        const [id] = await transaction('location').insert(location);

        let error = 0;

        const locationItens = items.map(async (item_id: any) =>{

            const validateItem = await transaction('items')
                .where({id: item_id})
                .first();
            
            if(!validateItem){
                error+=1
                return;
            } else {
                return {
                    item_id: validateItem.id,
                    location_id: id
                }
            }
        });

        if((await Promise.all(locationItens)) && error > 0) {
            transaction.rollback();
            return {message: "some item already exists"};
        }

        await transaction('locations_items').insert(await Promise.all(locationItens));

        await transaction.commit();

        return {
            ...location,
            id
        };
    }
}