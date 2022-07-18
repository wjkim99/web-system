export function validBlank(value) {
	return !(value === undefined || value === null || value === "");
}

export function validSelect(value) {
	return !(value === undefined || value === null || value === "" || value === "NONE")
}

export function validId(value) {
	const regexp = new RegExp('^[a-z]+[a-z0-9]{4,19}$', 'g');
	return regexp.test(value);
}

export function validPassword(value) {
	const regexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,16}$', 'g');
	return regexp.test(value);
}

export function activeFeedBack(value) {
	return value ? "none" : "block";
}