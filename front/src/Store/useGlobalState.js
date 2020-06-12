import { useReducer } from 'react';
import layoutReducer from '../components/Layout/reducer';
import listReducer from '../components/List/reducer';
import detailsReducer from '../components/Details/reducer';

const initial_state = {
	layoutReducer: {
		isLoading: false
	},
	listReducer: {
		items: [],
		errorMessage: '',
		isLoading: false
	},
	detailsReducer: {
		item: {},
		errorMessage: '',
		isLoading: true
	}
};

const rootReducer = {
	layoutReducer,
	listReducer,
	detailsReducer
};

const combineReducers = (reducers) => {
	return (state = {}, action) => {
		const newState = {};
		for (let key in reducers) {
			newState[key] = reducers[key](state[key], action);
		}

		return newState;
	};
};

export const useGlobalState = () => {
	const [ state, dispatch ] = useReducer(combineReducers(rootReducer), initial_state);

	return { state, dispatch };
};
