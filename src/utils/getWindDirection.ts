export const getWindDirection = (degrees: number) => {
	const val = Math.floor((degrees / 22.5) + .5);
	const directions = ["North", "North-northeast", "Northeast", "East-northeast", "East", "East-southeast", "Southeast", "South-southeast", "South", "South-southwest", "Southwest", "West-southwest", "West", "West-northwest", "Northwest", "North-northwest"];
	return directions[(val % 16)];
}