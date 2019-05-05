import React from 'react';

interface IFormattedTemperature {
	temp: number;
}

const FormattedTemperature = (props: IFormattedTemperature) => (
	<span>{props.temp}°C</span> // TODO: get from localstorage
);

export default FormattedTemperature;