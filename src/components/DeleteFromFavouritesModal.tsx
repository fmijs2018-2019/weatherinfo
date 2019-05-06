import * as React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

interface IDeleteFromFavouritesModalProps {
	showModal: boolean,
	onClose: () => void,
	onConfirm: () => void
}

export const DeleteFromFavouritesModal = (props: IDeleteFromFavouritesModalProps) => {

	const { showModal, onClose, onConfirm } = props;
	return <Modal open={showModal} basic size="small" closeOnDimmerClick={true} onClose={onClose}>
		<Header >
			<span><Icon name="trash" /></span>
			<FormattedMessage id="remove_city_modal.header" defaultMessage="Remove city from Favourites" />
		</Header>
		<Modal.Content>
			<p><FormattedMessage id="remove_city_modal.content" defaultMessage="Are you sure you want to remove the city from your favourites list?" /></p>
		</Modal.Content>
		<Modal.Actions>
			<Button inverted color="teal" onClick={onClose}>
				<Icon name="remove" /> <FormattedMessage id="common.cancel" defaultMessage="Cancel" />
			</Button>
			<Button inverted color="red" onClick={onConfirm}>
				<Icon name="checkmark" /> <FormattedMessage id="common.delete" defaultMessage="Delete" />
			</Button>
		</Modal.Actions>
	</Modal>
}