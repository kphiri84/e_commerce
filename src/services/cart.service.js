import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/api/';

const addToCart = (id) => {
	return axios.post(API_URL + `cart`, { id });
}; 

const fetchCart = () => {
	return axios.get(API_URL + `cart`);
};

const deletefromCart = (id) => {
	return axios.delete(API_URL + `cart/${id}`, { headers: authHeader() });
};

const payTotal = (cartObject) => {
	return axios.post(API_URL + `payment`, cartObject, { headers: authHeader() });
};

export default {
    addToCart,
    fetchCart,
    deletefromCart,
    payTotal
  };