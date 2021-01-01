import { POST_ADRESS_SUCCESS, ADRESS_FAIL, GET_ADRESS_SUCCESS, SET_MESSAGE } from './types';

import axios from 'axios';

export const postAdress = (civility, firstname, lastname, phone, street, complement, zipCode, city, country, UserId) => (
	dispatch
) => {
	return axios.post('http://localhost:3001/api/adresses/', {civility, firstname, lastname, phone, street, complement, zipCode, city, country, UserId}).then(
		(response) => {
			dispatch({
				type: POST_ADRESS_SUCCESS
			});

			dispatch({
				type: SET_MESSAGE,
				payload: response.data.message
			});

			return Promise.resolve();
		},
		(error) => {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: ADRESS_FAIL
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message
			});

			return Promise.reject();
		}
	);
};

export function getAdress() {
	return function(dispatch) {
		return axios
			.get('http://localhost:3001/api/adresses/')
			.then((res) => {
				dispatch({
					type: GET_ADRESS_SUCCESS,
					adress: res.data
				});
			})
			.catch((err) => {
				let error = 'Could not add the product.';
				// if (err.response && err.response.data && err.response.data) {
				//   error = err.response.data;
				// }
			});
	};
}

