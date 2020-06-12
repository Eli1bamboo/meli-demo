/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StoreContext } from '../../Store';
import SearchBar from '../SearchBar/SearchBar';
import List from '../List/List';
import Details from '../Details/Details';

export const Layout = () => {
	const { state } = useContext(StoreContext);

	const { layoutReducer: { isLoading } } = state;

	return (
		<Router>
			<div className="layout">
				<div className="top-bar">
					<SearchBar isLoading={isLoading} />
				</div>
				<div className="app-body">
					<Switch>
						<Route exact path="/">
							<p>Home Screen</p>
						</Route>
						<Route path="/items/:id">
							<Details />
						</Route>
						<Route path="/items">
							<List />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
};
