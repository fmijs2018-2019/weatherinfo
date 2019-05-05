import * as React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

interface IResetSettingsModalProps {
	showModal: boolean,
	onClose: () => void,
	onConfirm: () => void
}

export const ResetSettingsModal = (props: IResetSettingsModalProps) => {
	
	const { showModal, onClose, onConfirm } = props;
	return <Modal open={showModal} basic size="small" closeOnDimmerClick={true} onClose={onClose}>
		<Header icon="settings" content="Reset settings" />
		<Modal.Content>
			<p>Are you sure you want to remove your settings and set default ones?</p>
		</Modal.Content>
		<Modal.Actions>
			<Button inverted color="teal" onClick={onClose}>
				<Icon name="remove" /> Cancel
      		</Button>
			<Button inverted color="red" onClick={onConfirm}>
				<Icon name="checkmark" /> Reset
      		</Button>
		</Modal.Actions>
	</Modal>
}