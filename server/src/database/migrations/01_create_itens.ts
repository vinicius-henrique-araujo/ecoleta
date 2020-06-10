import Knex from 'knex';

export async function up(Knex: Knex) {
    return Knex.schema.createTable('itens', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();

    });

}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('itens');
}