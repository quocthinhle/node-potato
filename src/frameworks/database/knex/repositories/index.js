import UserRepositoryV2 from './users.js';

let userRepository;

const KnexRepositoriesContainer = {
	userRepository: {
		get() {
			return userRepository;
		},
	},
	init(knexConnection) {
		if (!userRepository) {
			userRepository = new UserRepositoryV2(knexConnection, 'users');
		}

		return this;
	},
};

export default KnexRepositoriesContainer;
