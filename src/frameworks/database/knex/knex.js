import knex from 'knex';
import logger from '../../../common/logging/index.js';
import knexConfiguration from '../../../configs/knexfile.js';

export default function init() {
	let connection;

	return {
		async connect() {
			connection = knex(knexConfiguration);
			await connection.raw('SELECT 1');
			logger.info('Postgres connection established');
		},
		getConnection() {
			return connection;
		},
		getTransaction() {
			return connection.transaction();
		},
	};
}
