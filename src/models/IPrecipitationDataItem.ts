import { IRain, ISnow } from "./ICurrentWeather";

export interface IPrecipitationDataItem {
	name: string,
	rain?: number, // 3h
	snow?: number // 3h
}