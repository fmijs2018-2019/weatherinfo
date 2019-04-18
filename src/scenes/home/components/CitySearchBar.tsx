import * as React from 'react';
import { Segment, Input, Divider, Button } from 'semantic-ui-react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { messages } from '../../../intl/messages';

function onChange(e: any, obj: any) {
	console.log(e, obj);
}

interface ICitySearchBarProps extends InjectedIntlProps {
	onSearchButtonClick: (event: any, data: any) => void,
	onLocationButtonClick: (event: any, data: any) => void,
	onSearchValueChange: (event: any) => void
}

const CitySearchBar = (props: ICitySearchBarProps) => {
	return <Segment size='large' basic textAlign='center'>
		<Input
			action={{ color: 'teal', content: <FormattedMessage id='common.search' defaultMessage='Search' />, size: 'large', onClick: props.onSearchButtonClick }}
			icon='search'
			iconPosition='left'
			placeholder={props.intl.formatMessage(messages.searchPlaceholder)}
			size="large"
			onChange={props.onSearchValueChange}
		/>

		<Divider horizontal>Or</Divider>

		<Button
			color='teal'
			size='large'
			content={<FormattedMessage id='common.your-location' defaultMessage='Your location' />}
			icon='map marker alternate'
			labelPosition='left'
			onClick={onChange} />
	</Segment>
}

export default injectIntl(CitySearchBar);
