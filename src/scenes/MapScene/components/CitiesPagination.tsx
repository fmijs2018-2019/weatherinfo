import React from 'react';
import { Icon } from 'semantic-ui-react';
import './CitiesPagination.css';

interface CitiesPaginationProps {
	activePage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const CitiesPagination = (props: CitiesPaginationProps) => {
	const {activePage, totalPages, onPageChange} = props;
	return <div className="cities-pagination">
		<div className="fgrow1 text-right">
			<Icon name="arrow alternate circle left outline" size="big" color="teal"
				disabled={activePage === 1} onClick={() => onPageChange(activePage - 1)}/>
		</div>
		<div className="fgrow2 text-center">
			{activePage}/{totalPages}
		</div>
		<div className="fgrow1">
			<Icon name="arrow alternate circle right outline" size="big" color="teal"
				disabled={activePage === totalPages} onClick={() => onPageChange(activePage + 1)}/>
		</div>
	</div>;
}
