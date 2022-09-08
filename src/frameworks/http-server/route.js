import express from 'express';
import { ValidationError } from 'express-validation';

import logger from '../../common/logging/index.js';
import userRouting from '../../api/v1/users/api.js';
import userRoutingV2 from '../../api/v2/users/api.js';
import MongooseRepositoriesContainer from '../database/repositories/index.js';
import KnexRepositoriesContainer from '../database/knex/repositories/index.js';
import Response from '../../common/utils/http-response.js';

export function configureRouting(app, redisClient) {
	const { userRepository } = MongooseRepositoriesContainer.init().get();

	const userRouter = userRouting({
		express,
		redisClient,
		repository: userRepository,
	});

	const apiRoute = express.Router();

	apiRoute.use('/users', userRouter);

	apiRoute.use((error, _req, res, _next) => {
		logger.error(error);

		if (error instanceof ValidationError) {
			return Response.error({ res, code: error.statusCode, message: 'Validation error', error });
		}

		return Response.error({ res, code: 500, error, message: 'hehe' });
	});

	app.use('/api/v1', apiRoute);
}

export function configureRoutingV2(app, redisClient, knexInstance) {
	const knexConnection = knexInstance.getConnection();
	const { userRepository } = KnexRepositoriesContainer.init(knexConnection).get();

	const userRouter = userRoutingV2({
		express,
		redisClient,
		repository: userRepository,
	});

	const apiRoute = express.Router();

	apiRoute.use('/users', userRouter);

	apiRoute.use((error, _req, res, _next) => {
		logger.error(error);

		if (error instanceof ValidationError) {
			return Response.error({ res, code: error.statusCode, message: 'Validation error', error });
		}

		return Response.error({ res, code: 500, error, message: 'hehe' });
	});

	app.use('/api/v2', apiRoute);
}
