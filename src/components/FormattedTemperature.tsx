import React from 'react';
import { getSettingsOrDefault } from '../common/localStorageService';
import { ISettings } from '../models/ISettings';

interface IFormattedTemperature {
	temp: number;
}

const FormattedTemperature = (props: IFormattedTemperature) => {
	const format: ISettings = getSettingsOrDefault();
	const tempFormat = format.tempMetric.toUpperCase();
	return <span>{props.temp}°{tempFormat}</span>;
};

export default FormattedTemperature;