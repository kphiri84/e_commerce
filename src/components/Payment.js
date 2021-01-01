import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../actions/product.action';
import { addToCart } from '../actions/cart.action';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Login from './Login';
import Adress from './Adress';
import CheckoutSteps from './CheckoutSteps';
import './payment.scss';

const Payment = () => {
	const { user: currentUser } = useSelector((state) => state.auth);
	const { product } = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.cart);
	const [ cardName, setCardName ] = useState('');
	const [ cardNumber, setCardNumber ] = useState('');
	const [ cardMonth, setCardMonth ] = useState('');
	const [ cardYear, setCardYear ] = useState('');
	const [ cardCvv, setCardCvv ] = useState('');
  const minCardYear = new Date().getFullYear();
  const [ cardNumberTemp, setCardNumberTemps ] = useState("")
  const [ isCardFlipped, setIsCardFlipped ] = useState(false)
  const [ focusElementStyle, setFocusElementStyle ] = useState(null)
  const [ isInputFocused, setIsInputFocused ] = useState(false)

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return (
		<div>
			{currentUser ? (
				<div>
					<CheckoutSteps step1 step2 step3 />
				</div>
			) : (
				<div>
					<CheckoutSteps step1 />
				</div>
			)}
			<div>
				{currentUser ? (
					<div>
						<p> Payment </p>
						<div class="wrapper" id="app">
							<div class="card-form">
								<div class="card-list">
									<div class="card-item" className="{ '-active' : isCardFlipped }">
										<div class="card-item__side -front">
											<div
												class="card-item__focus"
												class="{'-active' : focusElementStyle }"
												useRef="focusElement"
											/>
											<div class="card-item__cover">
												<img
                        src="https://i.pinimg.com/originals/d6/dc/00/d6dc008ab978b02f777ab8545eefeac5.jpg"
													// src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'"
													class="card-item__bg"
												/>
											</div>

											<div class="card-item__wrapper">
												<div class="card-item__top">
													<img
														src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
														class="card-item__chip"
													/>
													<div class="card-item__type">
														<transition name="slide-fade-up">
															<img
																src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
																v-if="getCardType"
																key="getCardType"
																alt=""
																class="card-item__typeImg"
															/>
														</transition>
													</div>
												</div>
												<label for="cardNumber" class="card-item__number" useRef="cardNumber">
													<div v-if="getCardType === 'amex'">
														<span v-for="(n, $index) in amexCardMask" key="$index">
															<transition name="slide-fade-up">
																<div
																	class="card-item__numberItem"
																	v-if="$index > 4  $index < 14  cardNumber.length > $index  n.trim() !== ''"
																>
																	#### #### #### ####
																</div>
																<div
																	class="card-item__numberItem"
																	class="{ '-active' : n.trim() === '' }"
																	key="$index"
																	v-else-if="cardNumber.length > $index"
																>
																	{cardNumber}
																</div>
																<div
																	class="card-item__numberItem"
																	class="{ '-active' : n.trim() === '' }"
																	key="$index + 1"
																>
																	{}
																</div>
															</transition>
														</span>
													</div>

													<template v-else>
														<span v-for="(n, $index) in otherCardMask" key="$index">
															<transition name="slide-fade-up">
																<div
																	class="card-item__numberItem"
																	v-if="$index > 4  $index < 15  cardNumber.length > $index  n.trim() !== ''"
																>
																	*
																</div>
																<div
																	class="card-item__numberItem"
																	class="{ '-active' : n.trim() === '' }"
																	key="$index"
																	v-else-if="cardNumber.length > $index"
																>
																	{cardNumber}
																</div>
																<div
																	class="card-item__numberItem"
																	class="{ '-active' : n.trim() === '' }"
																	v-else
																	key="$index + 1"
																>
																	{}
																</div>
															</transition>
														</span>
													</template>
												</label>
												<div class="card-item__content">
													<label for="cardName" class="card-item__info" useRef="cardName">
														<div class="card-item__holder">Titulaire</div>
														<transition name="slide-fade-up">
															<div class="card-item__name" v-else key="2">
																Nom complet
															</div>
														</transition>
													</label>
													<div class="card-item__date" useRef="cardDate">
														<label for="cardMonth" class="card-item__dateTitle">
															Expire à fin
														</label>
                            <div>
														<label for="cardMonth" class="card-item__dateItem">
															<transition name="slide-fade-up">
																<span v-else key="2">
																	MM
																</span>
															</transition>
														</label>
														<label for="cardYear" class="card-item__dateItem">
															<transition name="slide-fade-up">
																<span v-if="cardYear" key="cardYear">
																	{String(cardYear).slice(2, 4)}
																</span>
																<span v-else key="2">
																	/AA
																</span>
															</transition>
														</label>
                            </div>
													</div>
												</div>
											</div>
										</div>
										<div class="card-item__side -back">
											<div class="card-item__cover">
												<img
													src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'"
													class="card-item__bg"
												/>
											</div>
											<div class="card-item__band" />
											<div class="card-item__cvv">
												<div class="card-item__cvvTitle">CVV</div>
												<div class="card-item__cvvBand">
													<span v-for="(n, $index) in cardCvv" key="$index">
														*
													</span>
												</div>
												<div class="card-item__type">
													<img
														src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
														v-if="getCardType"
														class="card-item__typeImg"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="card-form__inner">
									<div class="card-input">
										<label for="cardNumber" class="card-input__label">
											Numéro de carte
										</label>
										<input
											type="text"
											id="cardNumber"
											class="card-input__input"
											v-mask="generateCardNumberMask"
											v-model="cardNumber"
											focus="focusInput"
											blur="blurInput"
											data-useRef="cardNumber"
											autocomplete="off"
										/>
									</div>
									<div class="card-input">
										<label for="cardName" class="card-input__label">
											Titulaire de la carte
										</label>
										<input
											type="text"
											id="cardName"
											class="card-input__input"
											v-model="cardName"
											focus="focusInput"
											blur="blurInput"
											data-useRef="cardName"
											autocomplete="off"
										/>
									</div>
									<div class="card-form__row">
										<div class="card-form__col">
											<div class="card-form__group">
												<label for="cardMonth" class="card-input__label">
													Date d'expiration
												</label>
												<select
													class="card-input__input -select"
													id="cardMonth"
													v-model="cardMonth"
													focus="focusInput"
													blur="blurInput"
													data-useRef="cardDate"
												>
													<option value="" disabled selected>
														Mois
													</option>
													<option
														value="n < 10 ? '0' + n : n"
														v-for="n in 12"
														disabled="n < minCardMonth"
														key="n"
													/>
												</select>
												<select
													class="card-input__input -select"
													id="cardYear"
													v-model="cardYear"
													focus="focusInput"
													blur="blurInput"
													data-useRef="cardDate"
												>
													<option value="" disabled selected>
														Année
													</option>
													<option
														value="$index + minCardYear"
														v-for="(n, $index) in 12"
														key="n"
													>
														{minCardYear}
													</option>
												</select>
											</div>
										</div>
										<div class="card-form__col -cvv">
											<div class="card-input">
												<label for="cardCvv" class="card-input__label">
													Cryptogramme visuel
												</label>
												<input
													type="text"
													class="card-input__input"
													id="cardCvv"
													v-mask="'####'"
													maxlength="4"
													v-model="cardCvv"
													focus="flipCard(true)"
													blur="flipCard(false)"
													autocomplete="off"
												/>
											</div>
										</div>
									</div>
									<Link to="/recapitulatif" className="form-group">
										<button class="card-form__button">Payer</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				) : (
					<Login />
				)}
			</div>
		</div>
	);
};

export default Payment;
