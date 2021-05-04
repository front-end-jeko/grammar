import { authHeader } from './auth-header';

export const fetchWrapper = {
	get,
	post,
	put,
	delete: _delete,
};

const authURL = process.env.HOST;

function get(endpoint, body) {
	const requestOptions = {
		method: 'GET',
		headers: {
			...body,
		},
	};
	return fetch(`${authURL}${endpoint}`, requestOptions).then(handleResponse);
}

function post(endpoint, bodyData, ContentType = 'application/json') {
	const requestOptions = {
		method: 'POST',
		headers: {
			Accept: '*/*',
			'access-control-allow-origin': '*',
			'Content-Type': 'application/json;charset=UTF-8',
			...authHeader(),
		},
		body: JSON.stringify({ ...bodyData }),
	};
	return fetch(`${authURL}${endpoint}`, requestOptions).then(handleResponse);
}

function put(endpoint, body) {
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	};
	return fetch(`${authURL}${endpoint}`, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(endpoint) {
	const requestOptions = {
		method: 'DELETE',
	};
	return fetch(`${authURL}${endpoint}`, requestOptions).then(handleResponse);
}

// helper functions
function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);

		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
