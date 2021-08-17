import knex from "../database/connection";
import IItems from "../interfaces/items";
import ILocations from "../interfaces/locations";

export default class LocationModel {
  public async getAll() {
    return await knex("location").select();
  }

  public async create(location: ILocations, items: IItems[]) {
    const transaction = await knex.transaction();

    const locationsExists = await transaction("location")
      .select()
      .where({ name: location.name })
      .first();

    if (locationsExists) {
      transaction.rollback();
      return { message: "location exists!" };
    }

    const [id] = await transaction("location").insert(location);

    let error = 0;

    const locationItens = items.map(async (item_id: any) => {
      const validateItem = await transaction("items")
        .where({ id: item_id })
        .first();

      if (!validateItem) {
        error += 1;
        return;
      } else {
        return {
          item_id: validateItem.id,
          location_id: id,
        };
      }
    });

    if ((await Promise.all(locationItens)) && error > 0) {
      transaction.rollback();
      return { message: "some item already exists" };
    }

    await transaction("locations_items").insert(
      await Promise.all(locationItens)
    );

    await transaction.commit();

    return {
      ...location,
      id,
    };
  }

  public async update(id: string, image: string) {
    let location = await knex("location").where({ id }).first();

    if (!location) {
      return { message: "Location not found!" };
    }

    await knex("location")
      .update({ ...location, image })
      .where({ id });
    
    location.image = image
    
    return location;
  }

  public async getWithFilter(city: string, uf: string, parsedItems: number[]) {
    const list = await knex('location')
        .join('locations_items', 'location.id', '=', 'locations_items.location_id')
        .whereIn('locations_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('location.*');

    return list;
  }

  public async findById(id: string){
    return await knex('location').select().where({id}).first();
  }
}
