import React from 'react';
import { IOWMCity } from '../../../common/common';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface ICitiesListProps {
	cities: IOWMCity[];
}

export const CitiesList: React.SFC<ICitiesListProps> = (props) => {
	return (
		<List divided relaxed>
			{props.cities.map(c => (
				<List.Item key={c.id} style={{ paddingLeft: "20px" }}>
					<List.Content>
						<Link className="header" to={`/cities/${c.id}`}>#{c.id}</Link>
						<List.Description style={{ fontSize: '1.1em' }} as='a'>{c.name}</List.Description>
					</List.Content>
				</List.Item>
			))}
		</List>
	);
}