import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Colors from './Colors'
import './Details.css';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts } from '../actions/product.action';
import { addToCart } from '../actions/cart.action';

const Product = () => {
	let { id } = useParams();
	const { product } = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.cart);
	const [quantity, setQuantity] = useState(1)

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return (
		<div>
			{product
				.filter((item) => {
					return item.id === parseInt(id);
				})
				.map((item) => (
					<div className="details">
						<img src={item.image} alt="" />
						<div className="box">
							<div className="row">
								<h2>{item.name}</h2>
							</div>
							<span>{item.price * quantity}€</span>
							<p>{item.description}</p>
							<div className="amount">
								Quantité:{' '}
								<select
									value={quantity}
									onChange={(e) => {
										setQuantity(e.target.value);
									}}
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
							<button className="cart" onClick={() => dispatch(addToCart(item.id, quantity))}>
								Ajouter au panier
							</button>
						</div>
					</div>
				))}
		</div>
	);
};

export default Product;
