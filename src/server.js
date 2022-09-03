import http from 'http';
import redisConnection from './frameworks/redis/connection.js';
import { redisConfiguration, mongoDbConfiguration } from './configs/index.js';
import { mongooseConnection } from './frameworks/database/index.js';
import { app, configureRouting } from './frameworks/http-server/index.js';

const server = http.createServer(app);

(async () => {
	const [redisClient] = await Promise.all([
		redisConnection.createRedisClient(redisConfiguration.connectionString),
		mongooseConnection(mongoDbConfiguration.connectionString).connect(),
	]);

	await redisClient.connect();

	configureRouting(app, redisClient);

	server.listen(3000);
})();
