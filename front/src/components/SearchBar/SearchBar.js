/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { StoreContext } from '../../Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../logo.png';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const SearchBar = (props) => {
	const query = useQuery();
	const { state, dispatch } = useContext(StoreContext);
	const [ keyword, setKeyword ] = useState(query.get('search') || '');

	useEffect(() => {
		keyword && fetchDataWithKeyword();
	}, []);

	const fetchDataWithKeyword = async () => {
		dispatch({ type: 'GET_LIST_ITEMS_LOADING' });

		const res = await fetch('http://localhost:4000/api/items/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				search: keyword,
				author: {
					name: 'Elias',
					lastname: 'Turrin'
				}
			})
		});

		res
			.json()
			.then((res) => {
				console.log(res);

				dispatch({ type: 'GET_LIST_ITEMS_SUCCESS', payload: res.results });
			})
			.then(() => {
				props.history.push(`/items?search=${keyword}`);
			})
			.catch((err) => dispatch({ type: 'GET_LIST_ITEMS_FAILED', errorMessage: err.message }));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value);
	};

	const handleSerach = (e) => {
		e.preventDefault();
		fetchDataWithKeyword();
	};

	const { listReducer: { isLoading } } = state;

	return (
		<div className="container-fluid">
			<div className="container px-0">
				<div className="row">
					<div className="col-12 col-md-2 text-center text-md-left">
						<img src={Logo} alt="logo" className="my-2" />
					</div>
					<div className="col-12 col-md-10">
						<form
							onSubmit={(e) => handleSerach(e)}
							className="search-form d-flex flex-row flex-grow-1 my-2"
						>
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Nunca dejes de buscar"
									name="keyword"
									onChange={handleChange}
									value={keyword}
									disabled={isLoading}
								/>
								<div className="input-group-append">
									<button className="btn btn-light" type="submit" disabled={isLoading}>
										{isLoading ? (
											<span
												className="spinner-border spinner-border-sm"
												role="status"
												aria-hidden="true"
											/>
										) : (
											<FontAwesomeIcon icon={faSearch} />
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(SearchBar);
