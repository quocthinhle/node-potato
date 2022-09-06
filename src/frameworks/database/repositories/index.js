import UserRepository from './user.js';
import UserDao from '../schemas/user.js';

let userRepository;

const MongooseRepositoriesContainer = {
	userRepository: {
		get() {
			return userRepository;
		},
	},
	init() {
		if (!userRepository) {
			userRepository = new UserRepository(UserDao);
		}

		return this;
	},
};

export default MongooseRepositoriesContainer;
