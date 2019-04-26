import * as React from 'react';
import apiConfig from '../api/apiConfig';

interface IWeatherIconProps {
	icon: string
}

export default (props: IWeatherIconProps) => {
	const imgUrl = `${apiConfig.imgUrl}/${props.icon}.png`;
	return <img src={imgUrl} />;
}