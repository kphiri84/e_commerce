import { POST_ADRESS_SUCCESS, ADRESS_FAIL, GET_ADRESS_SUCCESS, SET_MESSAGE } from '../actions/types';

const initialState = {
	adress: [],
	error: '',
	isFetching: false,
	message: ''
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case POST_ADRESS_SUCCESS:
			return {
				...state,
				isLoggedIn: false
			};
		case ADRESS_FAIL:
			return {
				...state,
				isLoggedIn: false
			};
		case GET_ADRESS_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				adress: action.adress
			};
		default:
			return state;
	}
}
