import React from 'react';
import "./CountryInfoPanel.css";
import { ICountry } from './WorldMap';
import { Header, Flag, Table, List, Icon, Pagination } from 'semantic-ui-react';
import { IOWMCity, IOWMCitiesByCountry } from '../../../common/common';
import { Link } from 'react-router-dom';
import { CitiesList } from './CitiesList';
import { CitiesPagination } from './CitiesPagination';


interface ICountryInfoPanelProps {
	country: ICountry;
	cities: IOWMCitiesByCountry;
	onClose: () => void;
	onPageChange: (newPage: number) => void;
	activePage: number;
	totalPages: number;
}

export default class CoutnryInfoPanel extends React.Component<ICountryInfoPanelProps>  {
	constructor(props: ICountryInfoPanelProps) {
		super(props);
	}

	render() {
		const { country, cities, onClose, onPageChange, activePage, totalPages } = this.props;
		return (
			<div className="panel">
				<div className="panel-header">
					<div style={{ textAlign: "right" }}>
						<Icon onClick={onClose} name="times circle outline" className="panel-close-icon" />
					</div>
					<Header as='h2' textAlign="center" style={{ margin: "-5px 10px 10px 10px" }}>
						{country.properties.name}
					</Header>
				</div>
				<div className="panel-body">
					{cities && <CitiesList cities={cities.list} />}
				</div>
				<div className="panel-footer">
					<CitiesPagination activePage={activePage} totalPages={totalPages} onPageChange={onPageChange} />
				</div>
			</div >
		)
	}
}

