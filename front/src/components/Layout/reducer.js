const layoutReducer = (state, action) => {
	switch (action.type) {
		case 'IS_LOADING':
			return {
				...state,
				isLoading: true
			};
		case 'IS_LOADING_DONE':
			return {
				...state,
				isLoading: false
			};
		default:
			return state;
	}
};

export default layoutReducer;
