import * as React from 'react';
import { ICurrentWeather } from '../../../models/ICurrentWeather';
import { Pagination } from 'semantic-ui-react';
import { FavouritesItem } from './FavouritesItem';

interface IFavouritesContainerProps {
	onHeartClick: (cityId: number) => void,
	onPageChange: (page: number) => void,
	favouritesWeather: ICurrentWeather[],
	activePage: number,
	totalPages: number
}

export class FavouritesContainer extends React.Component<IFavouritesContainerProps> {

	render() {
		const { favouritesWeather, onHeartClick, onPageChange, totalPages } = this.props;

		return <React.Fragment>
			<div>
				{favouritesWeather.map(i => <FavouritesItem onHeartClick={onHeartClick} key={i.id} currentWeather={i}></FavouritesItem>)}
			</div>
			{favouritesWeather.length > 0 && <Pagination 
				style={{float: 'right'}}
				totalPages={totalPages}
				onPageChange={(e: any, d: any) => onPageChange(d.activePage)}
				defaultActivePage={1}
				firstItem={null}
				lastItem={null} /> || <div>There is no cities in Favourites.</div>}
		</React.Fragment>
	}
}