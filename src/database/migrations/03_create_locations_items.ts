import Knex from 'knex';
//import knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('locations_items', table =>{
        table.increments('id').primary();
        table.integer('location_id')
            .notNullable()
            .references('id')
            .inTable('location');
            table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('locations_items');
}