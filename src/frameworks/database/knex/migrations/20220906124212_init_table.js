/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	knex.schema.createTable('users', table => {
		table.uuid('id', { primaryKey: true }).primary();
		table.string('name');
		table.string('surname');
		table.string('email');
		table.timestamps(true, false);
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
