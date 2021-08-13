import Knex from "knex";

export async function up(knex:Knex) {
    return knex.schema.createTable('employees_locations', table => {
        table.increments('id').primary();
        table.integer('employee_id').notNullable().references('id').inTable('employees');
        table.integer('location_id').notNullable().references('id').inTable('location');
    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('employees_locations');
}