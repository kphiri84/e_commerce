import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Link } from 'react-router-dom';
import CartIcon from './components/svg/shopping-cart-solid.png';
import './components/Products.css';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import BoardUser from './components/BoardUser';
import Shoes from './components/Shoes';
import Clothes from './components/Clothes';
import Bags from './components/Bags';
import Accesories from './components/Accesories';
import Cart from './components/Cart';
import Product from './components/Product';
import Landing from './components/Landing';
import Checkout from './components/Checkout';
import { logout } from './actions/auth.action';
import { clearMessage } from './actions/message.action';
import { history } from './helpers/history';
import Payment from './components/Payment';
import Recap from './components/Recap';
import Footer from './components/Footer';

const App = () => {
	const { cart } = useSelector((state) => state.cart);
	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(
		() => {
			history.listen((location) => {
				dispatch(clearMessage()); // clear message when changing location
			});
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			if (currentUser) {
				
			}
		},
		[ currentUser ]
	);

	const logOut = () => {
		dispatch(logout());
	};
	return (
		<Router history={history}>
			<div>
				<nav className="navbar navbar-expand navbar-transparent">
					<Link to={'/'} className="navbar-brand">
						<h1>Nike Shop</h1>
					</Link>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={'/home'} className="nav-link">
								Accueil
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/chaussures'} className="nav-link">
								Chaussures
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/vetements'} className="nav-link">
								Vêtements
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/sacs'} className="nav-link">
								Sacs
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/accessoires'} className="nav-link">
								Accessoires
							</Link>
						</li>
					</div>

					{currentUser ? (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={'/profile'} className="nav-link">
									{currentUser.firstname}
								</Link>
							</li>
							<li className="nav-item">
								<a href="/login" className="nav-link" onClick={logOut}>
									Déconnection
								</a>
							</li>
							<div className="nav-cart">
								<span className="test7">{cart.length}</span>
								<Link to="/panier">
									<img className="test" src={CartIcon} alt="" width="20" />
								</Link>
							</div>
						</div>
					) : (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={'/login'} className="nav-link">
									Connexion
								</Link>
							</li>

							<li className="nav-item">
								<Link to={'/register'} className="nav-link">
									Inscription
								</Link>
							</li>
							<div className="nav-cart">
								<span className="test">{cart.length}</span>
								<Link to="/panier">
									<img className="test" src={CartIcon} alt="" width="20" />
								</Link>
							</div>
						</div>
					)}
				</nav>
			</div>
			<Switch>
				<Route exact path={[ '/', '/home' ]} component={Landing} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/profile" component={BoardUser} />
				<Route exact path="/chaussures" component={Shoes} />
				<Route exact path="/chaussures/:id" component={Product} />
				<Route exact path="/vetements" component={Clothes} />
				<Route exact path="/vetements/:id" component={Product} />
				<Route exact path="/sacs" component={Bags} />
				<Route exact path="/sacs/:id" component={Product} />
				<Route exact path="/accessoires" component={Accesories} />
				<Route exact path="/accessoires/:id" component={Product} />
				<Route exact path="/panier" component={Cart} />
				<Route exact path="/adresse" component={Checkout} />
				<Route exact path="/paiement" component={Payment} />
				<Route exact path="/recapitulatif" component={Recap} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
