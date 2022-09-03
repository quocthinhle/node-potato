import UserDao from './user.js';
import PostDao from './post.js';

const create = () => ({
	Post: PostDao,
	User: UserDao,
});

export default create;
