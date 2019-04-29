import * as React from 'react';
import PreferencesNavBar from './components/PreferencesNavBar';
import { getAllFavourites as getFavourites } from '../../common/favourites';
import { FavouritesSegment } from './components/FavouritesSegment';
import { ICurrentWeather } from '../../models/ICurrentWeather';
import weatherApi from '../../api/WeatherApi';

interface IPreferencesSceneProps {

}

interface IPreferencesSceneState {
	activeItem: string,
	favouritesWeather: ICurrentWeather[];
}

export class PreferencesScene extends React.Component<IPreferencesSceneProps, IPreferencesSceneState> {

	constructor(props: Readonly<IPreferencesSceneProps>) {
		super(props);

		this.state = {
			activeItem: "Favourites",
			favouritesWeather: []
		}
	}

	componentDidMount() {
		const favourites: number[] = getFavourites();

		let favouritesWeather: ICurrentWeather[] = [];
		let promises: Promise<void | ICurrentWeather>[] = [];
		favourites.forEach(cityId => {
			promises.push(weatherApi.getCurrentWeatherById(cityId).then(cityWeather => {
				favouritesWeather.push(cityWeather);
			}));
		});

		Promise.all(promises).then(() => {
			this.setState({ favouritesWeather });
		});
	}

	onNavBarItemClick = (e: any, data: { name: string }) => {
		this.setState({ activeItem: data.name });
	}

	render() {
		const { activeItem, favouritesWeather } = this.state;

		return <div className="container body">
			<PreferencesNavBar activeItem={activeItem} handleItemClick={this.onNavBarItemClick} />
			{activeItem === 'Favourites' && <FavouritesSegment items={favouritesWeather}></FavouritesSegment>}
			{activeItem === 'Settigns' && <div></div>}
		</div>
	}
} 