import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/api/';

const fetchProducts = () => {
	return axios.get(API_URL + 'products/');
};

const fetchProduct = (id) => {
	return axios.get(API_URL + `products/${id}`);
};

export default {
	fetchProducts,
	fetchProduct
};
