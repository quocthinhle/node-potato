export const toUserDomain = user => {
	const {
		username,
		surname,
		email,
		created,
	} = user;

	return {
		username,
		surname,
		email,
		created,
	};
};

