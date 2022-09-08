import { join } from 'path';

const knexConfiguration = {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5432',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB || 'learning',
    },
    migrations: {
        directory: join(process.cwd(), '../frameworks/database/knex/migrations'),
        tableName: 'migrations',
    },
    seeds: {
        directory: join(process.cwd(), '../frameworks/database/knex/seeds'),
    },
};

export default knexConfiguration;
