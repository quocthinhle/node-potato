import './load-env.js';
import http from 'http';
import logger from './common/logging/index.js';
import { redisConnection, promisify } from './frameworks/redis/index.js';
import { redisConfiguration, mongoDbConfiguration } from './configs/index.js';
import {
    mongooseConnection,
    knexConfiguration,
} from './frameworks/database/index.js';
import {
    app,
    configureRouting,
    configureRoutingV2,
} from './frameworks/http-server/index.js';

const server = http.createServer(app);

(async () => {
    try {
        process.on('unhandledRejection', (_result, _error) => {
            logger.error(_error);
            process.exit(1);
        });

        const knexQueryBuilder = knexConfiguration();

        const [redisClient] = await Promise.all([
            redisConnection.createRedisClient(redisConfiguration),
            knexQueryBuilder.connect(),
            mongooseConnection(mongoDbConfiguration.connectionString).connect(),
        ]);

        await redisClient.connect();

        const redisUtil = promisify(redisClient);

        configureRouting(app, redisUtil);
        configureRoutingV2(app, redisUtil, knexQueryBuilder);

        server.listen(6969);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
