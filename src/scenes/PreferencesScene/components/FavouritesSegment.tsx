import * as React from 'react';
import { ICurrentWeather } from '../../../models/ICurrentWeather';
import { Segment } from 'semantic-ui-react';
import { SearchResultItem } from '../../HomeScene/components/SearchResultItem';

interface IFavouritesSegmentProps {
	items: ICurrentWeather[]
}

export const FavouritesSegment = (props: IFavouritesSegmentProps) => {
	console.log(props.items);
	return <Segment>
		{props.items.map(i => <SearchResultItem key={i.id} currentWeather={i}></SearchResultItem>)}
	</Segment>
}