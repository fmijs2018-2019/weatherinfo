import { getSettingsOrDefault } from "./localStorageService";

export function formatDate(date: Date) {
	const settings = getSettingsOrDefault();
	let hours: number | string = date.getHours();
	let minutes: number | string = date.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes;
	
	if(settings.hoursFormat === '12') {		
		let ampm = hours >= 12 ? 'p.m.' : 'a.m.';
		hours = hours % 12;
		hours = hours ? hours : 12;
		return hours + ':' + minutes + ' ' + ampm;
	}

	if(settings.hoursFormat === '24') {	
		hours = hours < 10 ? '0' + hours : hours;
		return hours + ':' + minutes;
	}

	return '';
}