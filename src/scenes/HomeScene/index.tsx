import * as React from 'react';
import { CitySearchBar } from './components/CitySearchBar';
import './index.css'
import weatherApi from '../../api/WeatherApi';
import { ICurrentWeather } from '../../models/ICurrentWeather';
import { Message, Icon } from 'semantic-ui-react';
import { ListWeatherItem } from '../../components/ListWeatherItem';
import { removeFromFavourites, addToFavourites, checkIfInFavourites, getFavourites } from '../../common/favourites';
import { HeartToggleIcon } from '../../components/HeartToggleIcon';

interface IHomeSceneState {
	cityWeatherItems: ICurrentWeather[],
	favourites: number[],
	cityNotFound: boolean;
}

interface IHomeSceneProps {

}

class HomeScene extends React.Component<IHomeSceneProps, IHomeSceneState> {

	constructor(props: Readonly<IHomeSceneProps>) {
		super(props);
		this.state = {
			cityWeatherItems: [],
			favourites: getFavourites(),
			cityNotFound: false,
		}
	}

	componentDidMount = () => {
		let promises = [];
		promises.push(weatherApi.getCurrentWeatherByName('Sofia'));
		promises.push(weatherApi.getCurrentWeatherByName('London'));
		promises.push(weatherApi.getCurrentWeatherByName('Washington'));

		Promise.all(promises)
			.then(weatherItems => {
				this.setState({ cityWeatherItems: weatherItems });
			});
	}

	onSearchValueChange: any = (city: string, code: string) => {
		const input = code ? city + "," + code : city;
		weatherApi.getCurrentWeatherByName(input)
			.then(res => {
				this.setState({ cityWeatherItems: [res], cityNotFound: false });
			}).catch(error => {
				this.setState({ cityWeatherItems: [], cityNotFound: true })
			});
	}

	onToggleIconClick = (cityId: number) => {
		checkIfInFavourites(cityId) ? removeFromFavourites(cityId) : addToFavourites(cityId);
		this.setState({ favourites: getFavourites() });
	}

	onGetLocation = (position: Position) => {
		weatherApi.getCurrentWeatherByLocation(position.coords.longitude, position.coords.latitude)
			.then(res => {
				this.setState({ cityWeatherItems: [res], cityNotFound: false });
			}).catch(error => {
				this.setState({ cityWeatherItems: [], cityNotFound: true })
			});
	}

	render() {
		const { cityNotFound, cityWeatherItems } = this.state;
		return <React.Fragment>
			<div className="search-container">
				<CitySearchBar onSelect={this.onSearchValueChange} onGetLocation={this.onGetLocation} ></CitySearchBar>
			</div>
			<div className="search-result-container">
				{cityNotFound && <Message color='teal'>No <b>WeatherInfo</b> for selected city :(</Message>}
				{cityWeatherItems.map(i =>
					<ListWeatherItem
						iconButton={<HeartToggleIcon
							onClick={() => this.onToggleIconClick(i.id)}
							active={checkIfInFavourites(i.id)} />}
						key={i.id}
						currentWeather={i} />)}
			</div>
		</React.Fragment>
	}
}

export default HomeScene;