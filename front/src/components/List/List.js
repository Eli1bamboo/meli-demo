/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { StoreContext } from '../../Store';
import ListItem from './ListItem';

const List = () => {
	const { state } = useContext(StoreContext);

	const { listReducer: { items, errorMessage, isLoading } } = state;

	return (
		<div className="list">
			<div className="container">
				{isLoading ? (
					<div class="text-center">
						<div class="spinner-border" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				) : (
					<div className="row">
						{items.map((item, index) => (index < 4 ? <ListItem key={item.id} item={item} /> : ''))}
					</div>
				)}
			</div>
		</div>
	);
};

export default List;
