export function getPaginationItems(list, page, limit) {

	if(list === undefined || list === null) {
		return [];
	}

	const result = [];

	const min = limit * page - limit;
	const max = limit * page - 1;

	for(let i=0; i<list.length; i++) {
		if(max >= i && i >= min) {
			result.push(list[i]);
		}
	}

	return result;

}