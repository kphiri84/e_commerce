import {
	FETCHING_CART,
	ADD_TO_CART_SUCCESS,
	CLEAR_ERROR_MESSAGE,
	FETCHING_CART_SUCCESS,
	FETCHING_CART_FAILURE,
	PAY_TOTAL_FAILURE,
	PAID_TOTAL_SUCCESSFULLY
} from './types';
import axios from 'axios';
import CartService from '../services/cart.service';

export const fetchingCart = () => {
	return {
		type: FETCHING_CART
	};
};

export const addToCartSuccess = () => {
	return {
		type: ADD_TO_CART_SUCCESS,
		message: 'Added to cart.'
	};
};

export const clearMessage = () => {
	return {
		type: CLEAR_ERROR_MESSAGE
	};
};

export const fetchingCartSuccess = (cart) => {
	return {
		type: FETCHING_CART_SUCCESS,
		cart
	};
};

export const fetchingCartError = (error) => {
	return {
		type: FETCHING_CART_FAILURE,
		error
	};
};

export const failedToPay = (error) => {
	return {
		type: PAY_TOTAL_FAILURE,
		error
	};
};

export const successfullyPaid = () => {
	return {
		type: PAID_TOTAL_SUCCESSFULLY
	};
};

export function addToCart(id, quantity) {
	return function(dispatch) {
		return axios
			.get(`http://localhost:3001/api/products/${id}`)
			.then((res) => {
				dispatch({
					type: ADD_TO_CART_SUCCESS,
					cart: {
						id: res.data.id,
						name: res.data.name,
						image: res.data.image,
						price: res.data.price,
						description: res.data.description,
						quantity
					}
				});
			})
			.catch((err) => {
				let error = 'Could not add the product.';
				// if (err.response && err.response.data && err.response.data) {
				//   error = err.response.data;
				// }
				dispatch(fetchingCartError(error));
				return setTimeout(() => {
					dispatch(clearMessage());
				}, 5000);
			});
	};
}

export const fetchCart = () => (dispatch) => {
	dispatch(fetchingCart());
	return CartService.fetchCart().then((res) => dispatch(fetchingCartSuccess(res.data[0]))).catch((err) => {
		let error = 'Could not get the cart infomation.';
		// if (err.response && err.response.data && err.response.data) {
		//   error = err.response.data;
		// }
		return dispatch(fetchingCartError(error));
	});
};

export const deletefromCart = (id) => (dispatch) => {
	dispatch(fetchingCart());
	return CartService.deletefromCart().then((res) => dispatch(fetchingCartSuccess(res.data[0]))).catch((err) => {
		let error = 'Could not remove the product.';
		// if (err.response && err.response.data && err.response.data) {
		//   error = err.response.data;
		// }
		return dispatch(fetchingCartError(error));
	});
};

// export const payTotal = (cartObject) => (dispatch) => {
// 	return CartService.payTotal()
// 		.then((res) => {
// 			dispatch(successfullyPaid());
// 			return browserHistory.push('/account');
// 		})
// 		.catch((err) => {
// 			let error = 'Could not purchase them.';
// 			// if (err.response && err.response.data && err.response.data) {
// 			//   error = err.response.data;
// 			// }
// 			return dispatch(failedToPay(error));
// 		});
// };
