import { ISettings } from "../models/ISettings";

export const addToFavourites = (cityId: number) => {
	let favouritesStr = localStorage.getItem('favourites');
	let favourites: number[];

	if (favouritesStr) {
		favourites = JSON.parse(favouritesStr);
		const indexOfCity = favourites.indexOf(cityId);

		if (indexOfCity < 0) {
			favourites.push(cityId);
		}
	} else {
		favourites = [cityId];
	}

	localStorage.setItem('favourites', JSON.stringify(favourites));
}

export const removeFromFavourites = (cityId: number) => {
	let favouritesStr = localStorage.getItem('favourites');
	let favourites: number[];

	if (favouritesStr) {
		favourites = JSON.parse(favouritesStr);
		const indexOfCity = favourites.indexOf(cityId);

		if (indexOfCity >= 0) {
			favourites.splice(indexOfCity, 1);
			localStorage.setItem('favourites', JSON.stringify(favourites));
		}
	}
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

export const getFavourites = () => {
	let favouritesStr = localStorage.getItem('favourites');

	return favouritesStr && JSON.parse(favouritesStr) || [];
}

export const getSettingsOrDefault = (): ISettings => {
	let settingsStr = localStorage.getItem('settings');
	const defaultSettings: ISettings = {
		language: 'en',
		tempMetric: 'c',
		hoursFormat: '24'
	}

	return settingsStr ? JSON.parse(settingsStr) : defaultSettings;
}

export const setSettings = (settings: ISettings) => {
	if (settings) {
		localStorage.setItem('settings', JSON.stringify(settings));
	}
}

export const resetSettings = () => {
	const defaultSettings: ISettings = {
		language: 'en',
		tempMetric: 'c',
		hoursFormat: '24'
	}
	localStorage.setItem('settings', JSON.stringify(defaultSettings));
	return defaultSettings;
}
