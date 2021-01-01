import { FETCHING_PRODUCT, FETCHING_PRODUCT_SUCCESS, FETCHING_PRODUCT_FAILURE } from '../actions/types';

const initialState = {
	product: [],
	error: '',
	isFetching: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case FETCHING_PRODUCT: 
			return {
				...state,
				isFetching: true
			};

		case FETCHING_PRODUCT_FAILURE:
			return {
				...state,
				isFetching: false,
				error: payload.error
			};

		case FETCHING_PRODUCT_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: '',
				product: action.product
			};

		default:
			return state;
	}
}
