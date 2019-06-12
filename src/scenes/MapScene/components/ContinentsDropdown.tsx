import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import { FormattedMessage, InjectedIntlProps, injectIntl, defineMessages } from 'react-intl';

interface IContinentsDropdownProps extends InjectedIntlProps {
	onContinentSelect: (item: IContinentItem) => void;
	className?: string;
	style?: React.CSSProperties;
	options: IContinentItem[];
}

export interface IContinentItem {
	name: React.ReactNode;
	lat: number;
	lon: number;
	zoom: number;
}

const messages = defineMessages({
	dropdownText: {
		id: 'common.location',
		defaultMessage: 'Location'
	}
})

const ContinentsDropdownInternal: React.SFC<IContinentsDropdownProps> = (props) => {
	const { onContinentSelect, className, style, options, intl } = props;
	const classes = classNames(className, "icon");

	const styles = {
		background: "#00b5ad",
		color: "white",
		...style
	}

	return (
		<Dropdown style={styles} text={intl.formatMessage(messages.dropdownText)} icon='location arrow' button labeled floating color="blue" className={classes}>
			<Dropdown.Menu>
				<Dropdown.Header >
					<span><Icon name="map marker alternate" /></span>
					<FormattedMessage id="map.filter_by_location" defaultMessage="Filter by location" />
				</Dropdown.Header>
				<Dropdown.Divider />
				{options.map((i, ind) => (
					<Dropdown.Item key={ind} onClick={() => onContinentSelect(i)} >{i.name}</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export const ContinentsDropdown = injectIntl(ContinentsDropdownInternal);
