export const getWindDirection = (degrees: number) => {
	const val = Math.floor((degrees / 22.5) + .5);
	const directions = ["North", "NNE", "Northeast", "ENE", "East", "ESE", "Southeast", "SSE", "South", "SSW", "Southwest", "WSW", "West", "WNW", "Northwest", "NNW"];
	return directions[(val % 16)];
}