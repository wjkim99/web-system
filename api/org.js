import {Access} from "./axios";
import {getCode, getData} from "../utils/response";

export async function getOrgsByService(service) {

	const headers = {
		'x-api-version': '1',
	};

	let response = null;

	await Access.post('/app/' + service + '/org', null, { headers })
		.then((r) => {
			response = r;
		});

	return getData(response);

}

export async function createOrg(service, param) {

	const headers = {
		'x-api-version': '1',
	};

	let response = null;

	await Access.put('/app/' + service + '/org', param, { headers })
		.then((r) => {
			response = r;
		});

	return getCode(response) === '000000';

}