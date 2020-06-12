/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import { StoreContext } from '../../Store';

const Details = () => {
	const { state, dispatch } = useContext(StoreContext);

	const { id } = useParams();

	useEffect(
		() => {
			fetchDetails(id);
		},
		[ id ]
	);

	const fetchDetails = async (id) => {
		dispatch({ type: 'GET_ITEM_LOADING' });

		const res = await fetch('http://localhost:4000/api/items/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				author: {
					name: 'Elias',
					lastname: 'Turrin'
				}
			})
		});

		res
			.json()
			.then((res) => {
				dispatch({ type: 'GET_ITEM_SUCCESS', payload: res });
			})
			.catch((err) => dispatch({ type: 'GET_ITEM_FAILED', errorMessage: err.message }));
	};

	const getCondition = (condition) => {
		switch (condition) {
			case 'new':
				return 'Nuevo';
			case 'used':
				return 'Usado';
			default:
				return '';
		}
	};

	const getPrice = (price, currency_id) =>
		price.toLocaleString('es-AR', {
			style: 'currency',
			currency: currency_id,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});

	const { detailsReducer: { item, errorMessage, isLoading } } = state;
	const { data, description } = item;

	return (
		<div className="my-4">
			<div className="container details">
				{isLoading ? (
					<div class="text-center">
						<div class="spinner-border" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				) : (
					<div className="row">
						{console.log(data.currency_id)}
						<div className="col-12 col-md-9">
							{<img src={data.thumbnail} alt={data.title} className="img-fluid w-100" />}
						</div>
						<div className="col-12 col-md-3 mt-3 selling">
							<p className="condition-sales">
								{getCondition(data.condition)}
								{data.sold_quantity > 0 ? `- ${data.sold_quantity} Vendidos` : ''}
							</p>
							<p className="title">{data.title}</p>
							<p className="price">{getPrice(data.price, data.currency_id)}</p>
							<Link to={'/'} className="btn btn-primary mt-4 w-100">
								Comprar
							</Link>
						</div>
						<div className="col-12 mt-3 description">
							<p className="title">Descripción del producto</p>
							<p>{description.plain_text}</p>
						</div>
					</div>
				)}
			</div>
			{errorMessage && <div>{errorMessage}</div>}
		</div>
	);
};

export default withRouter(Details);
