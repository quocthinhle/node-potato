/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = async function (knex) {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('users', table => {
        table.uuid('_id', { primaryKey: true }).primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('username').unique().notNullable();
        table.string('name');
        table.string('surname');
        table.string('email');
        table.string('password');
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
    return knex.schema.dropTable('users');
};

export { up, down };
