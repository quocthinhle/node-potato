import dotenv from 'dotenv';

dotenv.config();

import http from 'http';
import redisConnection from './frameworks/redis/connection.js';
import { redisConfiguration, mongoDbConfiguration } from './configs/index.js';
import { mongooseConnection, knexConfiguration } from './frameworks/database/index.js';
import { app, configureRouting, configureRoutingV2 } from './frameworks/http-server/index.js';

(async () => {
	const knexQueryBuilder = knexConfiguration();

	const [redisClient] = await Promise.all([
		redisConnection.createRedisClient(redisConfiguration.connectionString),
		knexQueryBuilder.connect(),
		mongooseConnection(mongoDbConfiguration.connectionString).connect(),
	]);

	await redisClient.connect();

	configureRouting(app, redisClient);
	configureRoutingV2(app, redisClient, knexQueryBuilder);

	const server = http.createServer(app);

	server.listen(6969);
})();
