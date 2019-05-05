import * as React from 'react';
import PreferencesNavBar from './components/PreferencesNavBar';
import { FavouritesContainer } from './components/FavouritesContainer';
import { ICurrentWeather } from '../../models/ICurrentWeather';
import { getFavourites } from '../../common/favourites';
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
			totalPages: 0
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

	onHeartClick = (cityId: number) => {
		let { pageItems, totalPages, activePage } = this.state;
		const favourites: number[] = getFavourites();
		const favouritesCount = favourites.length;
		let skip = (activePage - 1) * this.itemsPerPage;
		let take = Math.min(this.itemsPerPage, favouritesCount - skip);

		if(favouritesCount === 0) {
			this.setState({pageItems: [], totalPages: 0, activePage: 1});
			return;
		}

		const cityIndex = pageItems.findIndex(i => i.id === cityId);
		if (cityIndex >= 0) {
			if (activePage === totalPages && take === 0) {
				pageItems = [];
				let promises: Promise<void | ICurrentWeather>[] = [];
				skip -= this.itemsPerPage;
				take = this.itemsPerPage;
				for (let i = skip; i < skip + take; i++) {
					promises.push(weatherApi.getCurrentWeatherById(favourites[i]).then(cityWeather => {
						pageItems.push(cityWeather);
					}));
				}

				Promise.all(promises).then(() => {
					this.setState({ pageItems, activePage: activePage - 1, totalPages: totalPages - 1 })
				});
			} else if (activePage === totalPages && take > 0) {
				pageItems.splice(cityIndex, 1);
				this.setState({ pageItems });
			} else if (activePage !== totalPages) {
				pageItems.splice(cityIndex, 1);
				weatherApi.getCurrentWeatherById(favourites[skip + take - 1])
					.then(w => {
						pageItems.push(w);
						this.setState({ pageItems });
					});
			}
		}
	}

	onNavBarItemClick = (activeItem: string) => {
		this.setState({ activeTab: activeItem });
	}

	onPageChange = (activePage: number) => {
		const favourites: number[] = getFavourites();
		const skip = (activePage - 1) * this.itemsPerPage;
		const take = Math.min(this.itemsPerPage, favourites.length - skip);

		let favouritesWeather: ICurrentWeather[] = [];
		let promises: Promise<void | ICurrentWeather>[] = [];

		for (let i = skip; i < skip + take; i++) {
			promises.push(weatherApi.getCurrentWeatherById(favourites[i]).then(cityWeather => {
				favouritesWeather.push(cityWeather);
			}));
		}

		Promise.all(promises).then(() => {
			this.setState({ pageItems: favouritesWeather, activePage });
		});
	}

	render() {
		const { activeTab, activePage, pageItems: favouritesWeather, totalPages } = this.state;

		return <div className="container body">
			<PreferencesNavBar activeItem={activeTab} handleItemClick={(e: any, data: { name: string }) => this.onNavBarItemClick(data.name)} />
			{activeTab === 'Favourites' && <FavouritesContainer
				favouritesWeather={favouritesWeather}
				activePage={activePage}
				onPageChange={this.onPageChange}
				onHeartClick={this.onHeartClick}
				totalPages={totalPages} />}
			{activeTab === 'Settigns' && <div></div>}
		</div>
	}
} 