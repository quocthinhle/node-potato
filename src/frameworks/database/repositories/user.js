import BaseRepository from '../../../common/base/repository.js';
import UserModel from '../schemas/user.js';

class UserRepository extends BaseRepository {}

const userRepository = new UserRepository(UserModel);

export default userRepository;
