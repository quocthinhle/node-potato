import express from 'express';

import logger from '../../common/logging/index.js';
import userRouting from '../../api/v1/users/api.js';
import userRepository from '../database/repositories/user.js';
import Response from '../../common/utils/http-response.js';
import { ValidationError } from 'express-validation';

export default function configureRouting(app, redisClient) {
	const userRouter = userRouting({
		express,
		redisClient,
		repository: userRepository,
	});

	const apiRoute = express.Router();

	apiRoute.use('/v1/users', userRouter);

	apiRoute.use((error, _req, res, _next) => {
		logger.error(error);

		if (error instanceof ValidationError) {
			return Response.error({ res, code: error.statusCode, message: 'Validation error', error });
		}

		return Response.error({ res, code: 500, error, message: 'hehe' });
	});

	app.use('/api', apiRoute);
}
