import * as React from 'react';
import { Segment, Input, Divider, Button } from 'semantic-ui-react';

function onChange(e: any, obj: any) {
	console.log(e, obj);
}

interface ICitySearchBarProps {
	onSearchButtonClick: (event: any, data: any) => void,
	onLocationButtonClick: (event: any, data: any) => void,
	onSearchValueChange: (event: any) => void
}

export const CitySearchBar = (props: ICitySearchBarProps) => {
	return <Segment size='large' basic textAlign='center'>
		<Input
			action={{ color: 'teal', content: 'Search', size: 'large', onClick: props.onSearchButtonClick }}
			icon='search'
			iconPosition='left'
			placeholder='Search city...'
			size="large"
			onChange={props.onSearchValueChange}
		/>

		<Divider horizontal>Or</Divider>

		<Button
			color='teal'
			size='large'
			content='Your location'
			icon='map marker alternate'
			labelPosition='left'
			onClick={onChange} />
	</Segment>
}