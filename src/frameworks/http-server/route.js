import express from 'express';
import userRouting from '../../api/users/api.js';
import userRepository from '../database/repositories/user.js';
import { ValidationError } from 'express-validation';

export default function configureRouting(app, redisClient) {
	const userRouter = userRouting({
		express,
		redisClient,
		repository: userRepository,
	});

	const apiRoute = express.Router();

	apiRoute.use('/users', userRouter);

	apiRoute.use((err, req, res, _next) => {
		if (err instanceof ValidationError) {
			return res.status(err.statusCode).json(err);
		}

		return res.status(500).json(err);
	});

	app.use('/api', apiRoute);
}
