import ProductService from '../services/product.service';
import axios from 'axios'
import { FETCHING_PRODUCT, FETCHING_PRODUCT_SUCCESS, FETCHING_PRODUCT_FAILURE } from './types';

const fetchingProduct = (product) => {
	return {
		type: FETCHING_PRODUCT,
		payload: product
	};
};

const fetchingProductSuccess = (product) => {
	return {
		type: FETCHING_PRODUCT_SUCCESS,
		payload: product
	};
};

const fetchingProductError = (error) => {
	return {
		type: FETCHING_PRODUCT_FAILURE,
		error
	};
}; 

// export const fetchProducts = (dispatch) => {
// 	return ProductService.fetchProducts()
// 		.then((res) => {
// 			dispatch({
// 				type: FETCHING_PRODUCT,
// 			});
// 			dispatch({
// 				type: FETCHING_PRODUCT_SUCCESS,
// 				payload: res.data
// 			});
// 		})
// 		.catch((err) => {
// 			let error = 'Could not get the product information.';
// 			// if (err.response && err.response.data && err.response.data) {
// 			//   error = err.response.data;
// 			// }
// 			return dispatch({type: FETCHING_PRODUCT_FAILURE, payload:error});
// 		});
// };

export function fetchProducts () {
	return function (dispatch, quantity) {
	  dispatch({
		type: FETCHING_PRODUCT,
	});
	  return axios.get(`http://localhost:3001/api/products`)
		.then((res) => dispatch({
			type: FETCHING_PRODUCT_SUCCESS,
			product: res.data
		}))
		.catch((err) => {
		  let error = 'Could not get the product list.';
		  // if (err.response && err.response.data && err.response.data) {
		  //   error = err.response.data;
		  // }
		  return dispatch({type: FETCHING_PRODUCT_FAILURE, payload:error})
		});
	};
  }
  
  export function fetchProduct (id) {
	return function (dispatch) {
	  dispatch({
		type: FETCHING_PRODUCT,
	});
	  return axios.get(`http://localhost:3001/api/products/${id}`)
		.then((res) => dispatch({
			type: FETCHING_PRODUCT_SUCCESS,
			product: res.data
		}))
		.catch((err) => {
		  let error = 'Could not get the product list.';
		  // if (err.response && err.response.data && err.response.data) {
		  //   error = err.response.data;
		  // }
		  return dispatch({type: FETCHING_PRODUCT_FAILURE, payload:error})
		});
	};
  }

// export const fetchProduct = (id) => (dispatch) => {
// 	dispatch(fetchingProduct());
// 	return ProductService.fetchProduct()
// 		.then((res) => {
// 			return dispatch({
// 				type: FETCHING_PRODUCT_SUCCESS,
// 				product: res.data
// 			});
// 		})
// 		.catch((err) => {
// 			let error = 'Could not get the product information.';
// 			// if (err.response && err.response.data && err.response.data) {
// 			//   error = err.response.data;
// 			// }
// 			return dispatch({type: FETCHING_PRODUCT_FAILURE, payload:error});
// 		});
// };
