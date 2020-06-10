import Knex from 'knex';

export async function up(Knex: Knex) {
    return Knex.schema.createTable('points_itens', table => {
        table.increments('id').primary();
        table.integer('points_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('itens_id')
            .notNullable()
            .references('id')
            .inTable('itens');

    });

}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('points_itens');
}