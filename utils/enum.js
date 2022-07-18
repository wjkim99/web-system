export function getEnumValue(e, v) {

	let value = null;

	if(typeof e !== "object") {
		return null;
	}

	if(e.length <= 0) {
		return null;
	}

	for(const item of e) {

		Object.keys(item).forEach(key => {
			if(item[key] === v) {
				value = item;
			}
		})

	}

	return value;

}