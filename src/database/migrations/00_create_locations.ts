import Knex from 'knex';
//import knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('location', table =>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('image').notNullable();
    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('location');
}