function sortByFieldNumber(movies, field) {
	return movies.sort(function (a, b) {
		return a[field] - b[field];
	});
}

function sortByFieldString(movies, field) {
	return movies.sort(function (a, b) {
		var nameA = a[field].toUpperCase();
		var nameB = b[field].toUpperCase();
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		// names must be equal
		return 0;
	});
}

module.exports = { sortByFieldNumber, sortByFieldString };
