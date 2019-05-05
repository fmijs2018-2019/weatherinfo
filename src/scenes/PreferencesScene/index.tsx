import * as React from 'react';
import PreferencesNavBar from './components/PreferencesNavBar';
import { FavouritesSection } from './components/FavouritesSection';
import { ICurrentWeather } from '../../models/ICurrentWeather';
import { getFavourites, removeFromFavourites } from '../../common/favourites';
import weatherApi from '../../api/WeatherApi';

interface IPreferencesSceneState {
	activeTab: string,
	pageItems: ICurrentWeather[];
	activePage: number,
	totalPages: number
}

export class PreferencesScene extends React.Component<any, IPreferencesSceneState> {

	constructor(props: any) {
		super(props);

		this.state = {
			activeTab: "Favourites",
			pageItems: [],
			activePage: 1,
			totalPages: 0,
		}
	}

	itemsPerPage = 4;

	componentDidMount() {
		const favourites: number[] = getFavourites();
		let { activePage } = this.state;
		const skip = (activePage - 1) * this.itemsPerPage;
		const take = Math.min(this.itemsPerPage, favourites.length - skip);
		const totalPages = Math.ceil(favourites.length / 4);

		let pageItems: ICurrentWeather[] = [];
		let promises: Promise<void | ICurrentWeather>[] = [];

		for (let i = skip; i < skip + take; i++) {
			promises.push(weatherApi.getCurrentWeatherById(favourites[i]).then(cityWeather => {
				pageItems.push(cityWeather);
			}));
		}

		Promise.all(promises).then(() => {
			this.setState({ pageItems, totalPages });
		});
	}

	removeCityFromFavouritesList = (cityId: number) => {
		removeFromFavourites(cityId);
		let { activePage } = this.state;
		const favourites: number[] = getFavourites();
		const favouritesCount = favourites.length;
		const totalPages = Math.ceil(favourites.length / 4);

		if (activePage > totalPages) {
			activePage--;
		}

		if(activePage === 0) {
			this.setState({pageItems: [], totalPages: 0, activePage})
		}

		let skip = (activePage - 1) * this.itemsPerPage;
		let take = Math.min(this.itemsPerPage, favouritesCount - skip);

		let pageItems: ICurrentWeather[] = [];
		let promises: Promise<void | ICurrentWeather>[] = [];

		for (let i = skip; i < skip + take; i++) {
			promises.push(weatherApi.getCurrentWeatherById(favourites[i]).then(cityWeather => {
				pageItems.push(cityWeather);
			}));
		}

		Promise.all(promises).then(() => {
			this.setState({ pageItems, totalPages, activePage });
		});
	}

	onNavBarItemClick = (activeItem: string) => {
		this.setState({ activeTab: activeItem });
	}

	onPageChange = (activePage: number) => {
		const favourites: number[] = getFavourites();
		const skip = (activePage - 1) * this.itemsPerPage;
		const take = Math.min(this.itemsPerPage, favourites.length - skip);

		let pageItems: ICurrentWeather[] = [];
		let promises: Promise<void | ICurrentWeather>[] = [];

		for (let i = skip; i < skip + take; i++) {
			promises.push(weatherApi.getCurrentWeatherById(favourites[i]).then(cityWeather => {
				pageItems.push(cityWeather);
			}));
		}

		Promise.all(promises).then(() => {
			this.setState({ pageItems, activePage });
		});
	}

	deleteFromFavourites = (cityId: number) => {
		this.removeCityFromFavouritesList(cityId);
	}

	render() {
		const { activeTab, activePage, pageItems, totalPages } = this.state;

		return <div className="container body">
			<PreferencesNavBar activeItem={activeTab} handleItemClick={(e: any, data: { name: string }) => this.onNavBarItemClick(data.name)} />
			{activeTab === 'Favourites' && <FavouritesSection
				favouritesWeather={pageItems}
				activePage={activePage}
				onPageChange={this.onPageChange}
				totalPages={totalPages}
				deleteFromFavourites={this.deleteFromFavourites} />}
			{activeTab === 'Settigns' && <div></div>}
		</div>
	}
}
