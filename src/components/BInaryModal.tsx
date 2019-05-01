import * as React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

interface IBinaryModalProps {
	icon: string,
	header: string
	content: string,
}

export const BinaryModal = (props: IBinaryModalProps) => {
	const { header, content, icon } = props;
	return <React.Fragment>
		<Header icon={icon} content={header} />
		<Modal.Content>
			<p>{content}</p>
		</Modal.Content>
		<Modal.Actions>
			<Button basic color="red" inverted>
				<Icon name="remove" /> No
      		</Button>
			<Button color="green" inverted>
				<Icon name="checkmark" /> Yes
      		</Button>
		</Modal.Actions>
	</React.Fragment>
}