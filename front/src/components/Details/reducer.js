const detailsReducer = (state, action) => {
	switch (action.type) {
		case 'GET_ITEM_LOADING':
			return {
				...state,
				isLoading: true
			};
		case 'GET_ITEM_LOADING_DONE':
			return {
				...state,
				isLoading: false
			};
		case 'GET_ITEM_SUCCESS':
			return {
				...state,
				item: action.payload,
				isLoading: false
			};
		case 'GET_ITEM_FAILED':
			return {
				...state,
				errorMessage: action.errorMessage,
				isLoading: false
			};
		default:
			return state;
	}
};

export default detailsReducer;
