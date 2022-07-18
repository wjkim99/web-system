import {Access} from "./axios";
import {getCode, getData} from "../utils/response";

export async function getKeys() {

	const headers = {
		'x-api-version': '1',
	};

	let response = null;

	await Access.post('/app/key', null, { headers })
		.then((r) => {
			response = r;
		});

	return getData(response);

}

export async function createKey(param) {

	const headers = {
		'x-api-version': '1',
	};

	let response = null;

	await Access.put('/app/key', param, { headers })
		.then((r) => {
			response = r;
		});

	return getCode(response);

}