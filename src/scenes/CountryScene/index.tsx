import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getOpenWeatherMapCitiesByCountryAlpha2, CountryHelperMethods } from '../../common/common';

interface ICountrySceneState {
	cities: any[];
}

interface ICountrySceneProps extends RouteComponentProps {};

export default class CountryScene extends React.Component<ICountrySceneProps, ICountrySceneState> {
	constructor(props: ICountrySceneProps) {
		super(props);
		const alpha3Lower = (this.props.match.params as any).code;
		const alpha3 = (alpha3Lower as string).toUpperCase();
		const alpha2 = CountryHelperMethods.convertAlpha3ToAlpha2(alpha3);
		this.state = {
			cities:  getOpenWeatherMapCitiesByCountryAlpha2(alpha2 as string) || []
		};
	}

	render () {
		return (
			<ul>
				{this.state.cities.map(c => (
					<li key={c.i}>{c.i}{" "}{c.n}</li>
				))}
			</ul>
		);
	}
}