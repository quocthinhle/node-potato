import logger from '../../common/logging/index.js';

class UserController {
	constructor(service) {
		this.service = service;
	}

	async getUserById(req, res) {
		const { id } = req.params;
		const user = await this.service.getUserById(id);
		return res.status(200).json(user);
	}

	async test(req, res) {
		logger.info('Here');
		await this.service.getUserById();
		return res.status(200).json({});
	}

	async createUser(req, res) {
		const {
			username,
			password,
			email,
			name,
			surname,
		} = req.body;

		const user = await this.service.createUser({ username, password, email, name, surname });
		return res.status(200).json(user);
	}
}

export default UserController;
