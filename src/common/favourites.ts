export const addToFavourites = (cityId: number) => {
	let favouritesStr = localStorage.getItem('favourites');
	let favourites: number[];

	if (favouritesStr) {
		favourites = JSON.parse(favouritesStr);
		const indexOfCity = favourites.indexOf(cityId);

		if(indexOfCity >= 0) {
			favourites.splice(indexOfCity, 1);
		} else {
			favourites.push(cityId);
		}
	} else {
		favourites = [cityId];
	}

	localStorage.setItem('favourites', JSON.stringify(favourites));
}

export const checkIfInFavourites = (cityId: number) => {
	let favouritesStr = localStorage.getItem('favourites');
	let favourites: number[];

	if (favouritesStr) {
		favourites = JSON.parse(favouritesStr);
		return favourites.indexOf(cityId) >= 0;
	}
	
	return false;
}

export const getAllFavourites = () => {
	let favouritesStr = localStorage.getItem('favourites');

	return favouritesStr && JSON.parse(favouritesStr) || [];
}