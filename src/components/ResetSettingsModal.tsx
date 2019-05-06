import * as React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

interface IResetSettingsModalProps {
	showModal: boolean,
	onClose: () => void,
	onConfirm: () => void
}

export const ResetSettingsModal = (props: IResetSettingsModalProps) => {

	const { showModal, onClose, onConfirm } = props;
	return <Modal open={showModal} basic size="small" closeOnDimmerClick={true} onClose={onClose}>
		<Header>
			<span><Icon name="settings" /></span>
			<FormattedMessage id="reset_settings_modal.header" defaultMessage="Reset settings" />
		</Header>
		<Modal.Content>
			<p><FormattedMessage id="reset_settings_modal.content" defaultMessage="Are you sure you want to remove your settings and set default ones?" /></p>
		</Modal.Content>
		<Modal.Actions>
			<Button inverted color="teal" onClick={onClose}>
				<Icon name="remove" /> <FormattedMessage id="common.cancel" defaultMessage="Cancel" />
			</Button>
			<Button inverted color="red" onClick={onConfirm}>
				<Icon name="checkmark" /> <FormattedMessage id="common.reset" defaultMessage="Reset" />
			</Button>
		</Modal.Actions>
	</Modal>
}