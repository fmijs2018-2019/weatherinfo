import * as React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

interface IDeleteFromFavouritesModalProps {
	showModal: boolean,
	onClose: () => void,
	onConfirm: () => void
}

export const DeleteFromFavouritesModal = (props: IDeleteFromFavouritesModalProps) => {
	
	const { showModal, onClose, onConfirm } = props;
	return <Modal open={showModal} basic size="small" closeOnDimmerClick={true} onClose={onClose}>
		<Header icon='trash' content="Remove city from Favourites" />
		<Modal.Content>
			<p>Are you sure you want to remove the city from your favourites list?</p>
		</Modal.Content>
		<Modal.Actions>
			<Button inverted color="teal" onClick={onClose}>
				<Icon name="remove" /> Cancel
      		</Button>
			<Button inverted color="red" onClick={onConfirm}>
				<Icon name="checkmark" /> Delete
      		</Button>
		</Modal.Actions>
	</Modal>
}