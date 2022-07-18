export const getCode = (response) => {

	if(response === undefined || response === null) {
		return null;
	}

	if(response.data === undefined || response.data === null) {
		return null;
	}

	if(response.data.code === undefined || response.data.code === null) {
		return null;
	}

	return response.data.code;

}

export const getData = (response) => {

	const code = getCode(response);

	if(code === null) {
		return null;
	}

	if(code !== '000000') {
		return null;
	}

	if(response.data.result === undefined || response.data.result === null) {
		return null;
	}

	return response.data.result;

}