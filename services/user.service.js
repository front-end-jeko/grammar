import { fetchWrapper } from '../helpers/fetch-wrapper';

export const accountService = {
	userSignin,
	adminSignin,
};

function userSignin(Email, Password) {
	return fetchWrapper
		.post(`/Account/authenticate`, { Email, Password })
		.then((user) => user);
}

function adminSignin(Email, Password) {
	return fetchWrapper
		.post('/Account/authenticateAdmin', { Email, Password })
		.then((user) => user);
}
