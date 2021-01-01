import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/product.action';
import { Container, Row, Col } from 'reactstrap';
import { addToCart } from '../actions/cart.action';
// import Colors from './Colors';
// import '../css/Details.css';
import './Cart.css';

const Cart = () => {
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.cart);
	const [ quantity, setQuantity ] = useState(1);

	const removeProduct = (id) => {
		if (window.confirm('Voulez-vous vraiment supprimer cet article?')) {
			cart.forEach((item, index) => {
				if (item.id === id) {
					cart.splice(index, 1);
				}
			});
			getTotal();
		}
	};

	const getTotal = () => {
		const res = cart.reduce((prev, item) => {
			return prev + item.price * item.count;
		}, 0);
	};

	return (
		<Container>
			<Row>
				{cart.length === 0 ? (
					<h2 style={{ textAlign: 'center' }}>Aucun produit dans le panier</h2>
				) : (
					cart.map((item) => (
						<Col lg="8" className="cartDetails" key={item.id}>
							<img src={item.image} alt="" />
							<div className="box">
								<div className="row">
									<h2>{item.name}</h2>
								</div>
								<div className="row">
									<span>{item.price * item.quantity}€</span>
								</div>
								<p>{item.description}</p>
								<div className="amount">
									Quantité:{' '}
									<select
										value={item.quantity}
										onChange={(e) => dispatch(addToCart(item.id, e.target.value))}
									>
										<option key={1} value={1}>
											{1}
										</option>
										<option key={2} value={2}>
											{2}
										</option>
										<option key={3} value={3}>
											{3}
										</option>
										<option key={4} value={4}>
											{4}
										</option>
										<option key={5} value={5}>
											{5}
										</option>
									</select>
								</div>
							</div>
							<div className="delete" onClick={() => removeProduct(item.id)}>
								X
							</div>
						</Col>
					))
				)}
				<Col lg="4" className="cartCheckout">
					<h2 style={{ textAlign: 'center' }}>Récapitulatif</h2>
					<div className="paiementButton">
						<Link to="/adresse">
							<button className="buttonCart">Paiement</button>
						</Link>
					</div>
					<div className="paiementButton">
						<Link to="/">
							<button className="buttonCart">Continuer mes achats</button>
						</Link>
					</div>
					<div className="total">
						{cart.length <= 1 ? <p>{cart.length} produit</p> : <p>{cart.length} produits</p>}
						<h3>Total:€</h3>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Cart;
