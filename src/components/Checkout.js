import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../actions/product.action';
import { addToCart } from '../actions/cart.action';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Login from './Login';
import Adress from './Adress';
import CheckoutSteps from './CheckoutSteps';

const Checkout = () => {
    const { user: currentUser } = useSelector((state) => state.auth)
	const { product } = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.cart);

	useEffect(() => {
		dispatch(fetchProducts());
    }, []);
    
	return (
		<div>
			{currentUser ? <div>
			<CheckoutSteps step1 step2 ></CheckoutSteps>
			</div> : <div>
			<CheckoutSteps step1></CheckoutSteps>
			</div>}
			<div>{currentUser ? <Adress /> : <Login />}</div>
		</div>
	);
};

export default Checkout;
