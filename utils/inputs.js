export function inputIdValue(value) {
	if(value !== null) {
		return value.replace(/[^a-z0-9_\-]/, '');
	}
	return value;
}

export function inputPhoneValue(value) {
	if(value !== null) {
		return value
			.replace(/[^0-9]/, '')
			.replace(/-/g, '')
			.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
	}
	return value;
}