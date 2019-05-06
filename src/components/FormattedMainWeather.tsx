import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface IFormattedMainWeatherProps {
	weatherId: number
}

export const FormattedMainWeather = (props: IFormattedMainWeatherProps) => {
	const { weatherId } = props;
	switch (true) {
		case (weatherId >= 200 && weatherId <= 232):
			return <FormattedMessage id="weather.thunderstorm" defaultMessage="Thunderstorm" />
		case (weatherId >= 300 && weatherId <= 321):
			return <FormattedMessage id="weather.Drizzle" defaultMessage="Drizzle" />
		case (weatherId >= 500 && weatherId <= 531):
			return <FormattedMessage id="weather.rain" defaultMessage="Rain" />
		case (weatherId >= 600 && weatherId <= 622):
			return <FormattedMessage id="weather.snow" defaultMessage="Snow" />
		case (weatherId === 701):
			return <FormattedMessage id="weather.mist" defaultMessage="Mist" />
		case (weatherId === 711):
			return <FormattedMessage id="weather.smoke" defaultMessage="Smoke" />
		case (weatherId === 721):
			return <FormattedMessage id="weather.haze" defaultMessage="Haze" />
		case (weatherId === 731 || weatherId === 761):
			return <FormattedMessage id="weather.dust" defaultMessage="Dust" />
		case (weatherId === 741):
			return <FormattedMessage id="weather.fog" defaultMessage="Fog" />
		case (weatherId === 751):
			return <FormattedMessage id="weather.sand" defaultMessage="Sand" />
		case (weatherId === 762):
			return <FormattedMessage id="weather.ash" defaultMessage="Ash" />
		case (weatherId === 771):
			return <FormattedMessage id="weather.squall" defaultMessage="Squall" />
		case (weatherId === 781):
			return <FormattedMessage id="weather.tornado" defaultMessage="Tornado" />
		case (weatherId === 800):
			return <FormattedMessage id="weather.clear" defaultMessage="Clear" />
		case (weatherId >= 801 && weatherId <= 804):
			return <FormattedMessage id="weather.clouds" defaultMessage="Clouds" />
	}

	return <React.Fragment/>
}