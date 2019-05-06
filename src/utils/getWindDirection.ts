import { getSettingsOrDefault } from "../common/localStorageService";
import { ISettings } from "../models/ISettings";

export const getWindDirection = (degrees: number) => {
	const settings: ISettings = getSettingsOrDefault();
	const { language } = settings;
	const val = Math.floor((degrees / 22.5) + .5);
	const directionsEn = ["North", "NNE", "Northeast", "ENE", "East", "ESE", "Southeast", "SSE", "South", "SSW", "Southwest", "WSW", "West", "WNW", "Northwest", "NNW"];
	const directionsBg = ["Север", "ССИ", "Северозапад", "ИСИ", "Изток", "ИЮИ", "Югоизток", "ЮЮИ", "Юг", "ЮЮЗ", "Югозапад", "ЗЮЗ", "Запад", "ЗСЗ", "Северозапад", "ССЗ"];

	if (language === 'bg') {
		return directionsBg[(val % 16)];
	}
	
	return directionsEn[(val % 16)];
}