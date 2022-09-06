/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('users').del();
	await knex('users').insert([
		{ name: 'Thinh', surname: 'Le', username: 'lequocthinh12', email: 'roshan321.lol@gmail.com', password: '$2a$10$T6MRtyBOmkqwgKkK4hZk5OfcY7Cxhw04HBmLCbEPkXlqLN.QqMlBC' },
	]);
};

export { seed };
