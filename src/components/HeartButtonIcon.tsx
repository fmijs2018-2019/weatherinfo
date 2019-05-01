import * as React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { checkIfInFavourites, addToFavourites } from '../common/favourites';
import { BinaryModal } from './BInaryModal';

interface IHeartButtonIconProps {
	cityId: number,
	onRemove?: () => void
}

interface IHeartButtonIconState {
	isInFavourites: boolean
}

export class HeartButtonIcon extends React.Component<IHeartButtonIconProps, IHeartButtonIconState> {

	constructor(props: Readonly<IHeartButtonIconProps>) {
		super(props);

		this.state = {
			isInFavourites: checkIfInFavourites(this.props.cityId)
		}
	}

	onClick = () => {
		addToFavourites(this.props.cityId);
		const { isInFavourites } = this.state;
		const { onRemove } = this.props;
		if (isInFavourites && onRemove) {
			onRemove();
		}
		this.setState({ isInFavourites: !this.state.isInFavourites });
	}

	render() {
		const { isInFavourites } = this.state;

		return <React.Fragment>
			{!isInFavourites && <Button style={{ padding: 0, backgroundColor: 'transparent' }} icon onClick={this.onClick}><Icon name="heart outline" color="red" size="large" /></Button>}
			{isInFavourites && <Modal trigger={<Button style={{ padding: 0, backgroundColor: 'transparent' }} icon onClick={this.onClick}><Icon name="trash" color="grey" size="large" /></Button>}>
				<BinaryModal
					header="Remove City from Favourites"
					content="Are you sure you want to remove the city from your favourites list?"
					icon="trash" />
			</Modal>}
		</React.Fragment>
	}
}