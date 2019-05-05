import * as React from 'react';
import { ICurrentWeather } from '../../../models/ICurrentWeather';
import { Pagination, Icon, Button } from 'semantic-ui-react';
import { ListWeatherItem } from '../../../components/ListWeatherItem';
import { DeleteFromFavouritesModal } from '../../../components/DeleteFromFavouritesModal';

interface IFavouritesSectionProps {
	favouritesWeather: ICurrentWeather[],
	activePage: number,
	totalPages: number,
	deleteFromFavourites: (cityId: number) => void
	onPageChange: (page: number) => void,
}

interface IFavouritesSectionState {
	showModal: boolean,
	cityIdForDelete?: number
}

export class FavouritesSection extends React.Component<IFavouritesSectionProps, IFavouritesSectionState> {
	constructor(props: Readonly<IFavouritesSectionProps>) {
		super(props);

		this.state = { showModal: false };
	}

	onModalClose = () => {
		this.setState({ showModal: false, cityIdForDelete: undefined });
	}

	onTrashButtonClick = (cityId: number) => () => {
		this.setState({ showModal: true, cityIdForDelete: cityId });
	}

	onModalConfirm = () => {
		const cityId = this.state.cityIdForDelete || 0;
		this.setState({ showModal: false, cityIdForDelete: undefined });
		this.props.deleteFromFavourites(cityId);
	}

	render() {
		const { favouritesWeather, onPageChange, totalPages, activePage } = this.props;
		const { showModal } = this.state;

		return <React.Fragment >
			{favouritesWeather.map(i => <ListWeatherItem
				iconButton={<Button onClick={this.onTrashButtonClick(i.id)} icon style={{ padding: 0, backgroundColor: 'transparent' }} >
					<Icon name="trash" color="grey" size="large" />
				</Button>}
				currentWeather={i}
				key={i.id} />)}

			<DeleteFromFavouritesModal
				showModal={showModal}
				onClose={this.onModalClose}
				onConfirm={this.onModalConfirm} />

			{favouritesWeather.length > 0 && <Pagination
				style={{ float: 'right', marginTop: '10px' }}
				prevItem={{ disabled: activePage === 1, content: '⟨' }}
				nextItem={{ disabled: activePage === totalPages, content: '⟩' }}
				totalPages={totalPages}
				onPageChange={(e: any, d: any) => onPageChange(d.activePage)}
				defaultActivePage={1}
				firstItem={null}
				lastItem={null} /> || <div>There is no cities in Favourites.</div>}
		</React.Fragment >
	}
}