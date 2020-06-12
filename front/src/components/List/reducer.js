const listReducer = (state, action) => {
	switch (action.type) {
		case 'GET_LIST_ITEMS_LOADING':
			return {
				...state,
				isLoading: true
			};
		case 'GET_LIST_ITEMS_LOADING_DONE':
			return {
				...state,
				isLoading: false
			};
		case 'GET_LIST_ITEMS_SUCCESS':
			return {
				...state,
				items: action.payload,
				isLoading: false
			};
		case 'GET_LIST_ITEMS_FAILED':
			return {
				...state,
				errorMessage: action.errorMessage,
				isLoading: false
			};
		default:
			return state;
	}
};

export default listReducer;
