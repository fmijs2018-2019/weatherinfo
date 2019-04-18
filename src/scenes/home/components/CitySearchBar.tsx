import * as React from 'react';
import { Segment, Input, Divider, Button, Dropdown } from 'semantic-ui-react';
import _ from "lodash";
import GoogleApi from '../../../api/GoogleApi';
import { Prediction } from '../../../models/IPlacesAutocompleteResponse';
import { getCityCode } from '../../../common/CitiesCodes';
interface ICitySearchBarProps {
	onSelect: (city: string, code: string) => void
}

interface ICitySearchBarState {
	loading: boolean;
	placesList: any[];
}

export class CitySearchBar extends React.Component<ICitySearchBarProps, ICitySearchBarState> {
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
					const code = getCityCode(country, false) || ""; 
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

		return <Segment size='large' basic textAlign='center'>
			<Dropdown
				style={{ minWidth: 400 }}
				icon='search'
				selectOnNavigation={false}
				loading={loading}
				direction="right"
				placeholder='Search city...'
				size="large"
				onSearchChange={this.onSearchChange}
				fluid
				search
				selection
				options={placesList}
				onChange={this.onChange}
			/>
			<Divider horizontal>Or</Divider>
			<Button
				color='teal'
				size='large'
				content='Your location'
				icon='map marker alternate'
				labelPosition='left' />
		</Segment>;
	}
}
