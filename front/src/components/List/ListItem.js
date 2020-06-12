/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faCircle } from '@fortawesome/free-solid-svg-icons';

const ListItem = (props) => {
	const {
		item,
		item: { id, title, price, currency_id, thumbnail, shipping: { free_shipping }, address: { state_name } }
	} = props;

	const getPrice = () =>
		price.toLocaleString('es-AR', {
			style: 'currency',
			currency: currency_id,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});

	return (
		<div className="col-12 list-item">
			<Link to={`/items/${id}`}>
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-md-2 pr-md-0">
							<img src={thumbnail} className="img-fluid w-100" alt={title} />
						</div>
						<div className="col-12 col-md-8 mt-md-4">
							<p className="price mb-1">
								<span>{getPrice()}</span>
								{free_shipping && (
									<span className="fa-layers fa-fw ml-2">
										<FontAwesomeIcon icon={faCircle} size="lg" color="green" />
										<FontAwesomeIcon icon={faShippingFast} size="xs" color="white" />
									</span>
								)}
							</p>
							<p className="title">{title}</p>
						</div>
						<div className="col-12 col-md-2  mt-md-5">
							<p className="state_name">{state_name}</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ListItem;
