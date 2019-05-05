import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

interface IHeartToggleIconProps {
	active: boolean,
	onClick: () => void,
}

export const HeartToggleIcon = (props: IHeartToggleIconProps) => {

	const { onClick, active } = props;
	const iconName = active ? 'heart' : 'heart outline';

	return <Button
			style={{ padding: 0, backgroundColor: 'transparent' }}
			icon
			onClick={onClick}>
			<Icon name={iconName} size="large" color="red" />
		</Button>
}