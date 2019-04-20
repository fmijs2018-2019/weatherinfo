import React from 'react';
import { Dropdown, DropdownItemProps, DropdownItem } from 'semantic-ui-react';
import classNames from 'classnames';

interface IContinentsDropdownProps {
	onContinentSelect: (item: IContinentItem) => void;
	className?: string;
	style?: React.CSSProperties;
	options: IContinentItem[];
}

export interface IContinentItem {
	name: string;
	lat: number;
	lon: number;
	zoom: number;
}

export const ContinentsDropdown: React.SFC<IContinentsDropdownProps> = (props) => {
	const { onContinentSelect, className, style, options } = props;
	const classes = classNames(className, "icon");

	const styles = {
		background: "#00b5ad",
		color: "white",
		...style
	}

	return (
		<Dropdown style={styles} text='Location' icon='location arrow' button labeled floating color="blue" className={classes}>
			<Dropdown.Menu>
				<Dropdown.Header icon='map marker alternate' content='Filter by location' />
				<Dropdown.Divider />
				{options.map((i, ind) => (
					<Dropdown.Item key={ind} onClick={() => onContinentSelect(i)} >{i.name}</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};