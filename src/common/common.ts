import _ from "lodash";
import CountriesList from "./CountriesList.json";
import CitiesDictionary from "./CitiesList.json";
import OWMCountriesList from './OWMCountriesList.json';

const Alpha2Dictionary: _.Dictionary<number> = {};
const Alpha3Dictionary: _.Dictionary<number> = {};
const CountryDictionary: _.Dictionary<number> = {};

for (let i = 0; i < CountriesList.length; i++) {
	const alpha2 = CountriesList[i]["alpha-2"];
	const alpha3 = CountriesList[i]["alpha-3"];
	const country = CountriesList[i]["name"];
	Alpha2Dictionary[alpha2] = i;
	Alpha3Dictionary[alpha3] = i;
	CountryDictionary[country] = i;
}

export const CountryHelperMethods = {
	convertCountryToAlpha2 (countryName: string, fullMatch: boolean = true) {
		return this._convertCountryToCountryCode(countryName, "alpha-2", fullMatch);
	},
	convertCountrytoAlpha3 (countryName: string, fullMatch = true) {
		return this._convertCountryToCountryCode(countryName, "alpha-3", fullMatch);
	},
	convertAlpha3ToAlpha2 (alpha3: string) {
		const ind = Alpha3Dictionary[alpha3];
		return ind !== undefined
			? CountriesList[ind]["alpha-2"]
			: undefined;
	},
	convertAlpha2ToAlpha3 (alpha2: string) {
		const ind = Alpha3Dictionary[alpha2];
		return ind !== undefined
			? CountriesList[ind]["alpha-3"]
			: undefined;
	},
	_convertCountryToCountryCode(countryName: string, code: "alpha-2" | "alpha-3", fullMatch: boolean) {
		if (countryName === "USA") {
			return code === "alpha-2" ? "US" : "USA";
		} else if (countryName === "UK") {
			return code === "alpha-2" ? "GB" : "GBR";
		}
		
		const index = CountryDictionary[countryName];
		if(index !== undefined) {
			return CountriesList[index][code];
		}

		if (fullMatch) {
			return undefined;
		}

		let matches = 0;
		let result = undefined;
		for (let i = 0; i < CountriesList.length; i++) {
			if (matches > 1) {
				return undefined;
			}
			const name = CountriesList[i]["name"];
			if (name.includes(countryName)) {
				result = CountriesList[i][code];
				matches++;
			}
		}

		return result;
	}
}

export interface IOWMCity {
	id: number;
	name: string;
}

export interface IOWMCountry {
	id: number;
	name: string;
	country: string;
}

export interface IOWMCitiesByCountry {
	total: number;
	list: IOWMCity[];
	country?: IOWMCountry;
}

export const getOpenWeatherMapCitiesByCountryAlpha2 = (alpha2: string, skip: number, take: number): Promise<IOWMCitiesByCountry> => {
	return new Promise((resove, reject) => {
		const citiesList = (CitiesDictionary as any)[alpha2] as any[];
		if (!citiesList) {
			reject(`No results for found for: ${alpha2}`);
		}
		const takeLimited = Math.min(take, 200);
		const start = Math.max(0, skip);
		const end = Math.min(citiesList.length, start + takeLimited);
		const result = citiesList
			.slice(start, end)
			.map(v => ({
				id: v.i,
				name: v.n,
			}));

		const country = OWMCountriesList.find(x => x.country === alpha2);

		resove({
			list: result,
			total: citiesList.length,
			country
		});
	})
}