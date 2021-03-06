import * as React from 'react';
import { Segment, Divider, Button, Dropdown, Icon } from 'semantic-ui-react';
import _ from "lodash";
import GoogleApi from '../../../api/GoogleApi';
import { Prediction } from '../../../models/IPlacesAutocompleteResponse';
import { CountryHelperMethods } from '../../../common/common';
import { defineMessages, injectIntl, InjectedIntlProps, FormattedDate, FormattedMessage } from 'react-intl';

const citySearchBarMessages = defineMessages({
	searchPlaceholder: {
		id: 'search.placeholder',
		defaultMessage: 'Search city...'
	}
})

interface ICitySearchBarProps extends InjectedIntlProps {
	onSelect: (city: string, code: string) => void
	onGetLocation?: (position: Position) => void;
}

interface ICitySearchBarState {
	loading: boolean;
	placesList: any[];
}

class CitySearchBarInternal extends React.Component<ICitySearchBarProps, ICitySearchBarState> {
	constructor(props: any) {
		super(props);
		this.state = { loading: false, placesList: [] };
	}


	autocompletePlaces = (input: string) => {
		const callback: any = (predictions: Prediction[]) => {
			const placesList = (predictions || [])
				.filter(v => v.structured_formatting && v.structured_formatting.secondary_text)
				.map(v => {
					const fragments = v.structured_formatting.secondary_text.split(', ');
					const country = fragments[fragments.length - 1];
					const codeUpper = CountryHelperMethods.convertCountryToAlpha2(country, false) || "";
					const code = codeUpper.toLowerCase();
					return {
						flag: code,
						key: v.id,
						text: v.description,
						value: v.structured_formatting.main_text + ";" + code + ";" + v.id,
					};
				});

			this.setState({ loading: false, placesList: placesList });
		}
		GoogleApi.getPlacesAutocomplete(input, callback);
	}

	getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getLocationCallback);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	getLocationCallback = (position: Position) => {
		const { onGetLocation } = this.props;
		if (onGetLocation) {
			onGetLocation(position);
		}
	}

	autocompletePlacesDebounced = _.debounce(this.autocompletePlaces, 250);

	onSearchChange = (event: any, _data: any) => {
		if (event.target.value.length > 1) {
			this.setState({ loading: true, placesList: [] });
			this.autocompletePlacesDebounced(event.target.value);
		}
	}

	onChange = (event: any, data: any) => {
		const value = (data.value as string).split(';');
		const city = value[0];
		const code = value[1];

		this.props.onSelect(city, code);
	}

	render() {
		const { placesList, loading } = this.state;
		const { intl } = this.props;

		return <Segment size='large' basic textAlign='center'>
			<Dropdown
				style={{ minWidth: 400 }}
				icon='search'
				selectOnNavigation={false}
				loading={loading}
				direction="right"
				placeholder={intl.formatMessage(citySearchBarMessages.searchPlaceholder)}
				size="large"
				onSearchChange={this.onSearchChange}
				fluid
				search
				selection
				options={placesList}
				onChange={this.onChange}
			/>
			<Divider horizontal>
				<FormattedMessage id="common.or" defaultMessage="Or" />
			</Divider>
			<Button
				color='teal'
				size='large'
				onClick={this.getLocation} >
				<Icon name='map marker alternate' />
				<FormattedMessage id="search.your_location" defaultMessage="Your location"/>
			</Button>
		</Segment>;
	}
}

export const CitySearchBar = injectIntl(CitySearchBarInternal);