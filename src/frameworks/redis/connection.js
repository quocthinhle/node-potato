import redis from 'redis';
import logger from '../../common/logging/index.js';

const redisConnection = {
	createRedisClient(redisUrl) {
		const client = redis.createClient(redisUrl);

		client.on('error', () => {
			logger.error('Error connect redis');
		});

		return client;
	},
};

export default redisConnection;
