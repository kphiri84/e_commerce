import { combineReducers } from 'redux';
import auth from './auth.reducer';
import message from './message.reducer';
import cart from './cart.reducer';
import product from './product.reducer';

export default combineReducers({
	auth,
	message,
	cart,
	product,
});
