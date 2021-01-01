import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import { postAdress } from '../actions/adress.action';
import Checkout from './Checkout';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const vusername = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The username must be between 3 and 20 characters.
			</div>
		);
	}
};

const Adress = () => {
	const form = useRef();
	const checkBtn = useRef();
	const { user: currentUser } = useSelector((state) => state.auth);
	const [ civility, setCivility ] = useState('');
	const [ firstname, setFirstname ] = useState('');
	const [ lastname, setLastname ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ street, setStreet ] = useState('');
	const [ complement, setComplement ] = useState('');
	const [ zipCode, setZipCode ] = useState('');
	const [ city, setCity ] = useState('');
	const [ country, setCountry ] = useState('');
	const [ successful, setSuccessful ] = useState(false);
	const [ Monsieur, setMonsieur ] = useState('Monsieur');
	const [ Madame, setMadame ] = useState('Madame');
	const [ Mademoiselle, setMademoiselle ] = useState('Mademoiselle');
	const UserId = currentUser.id;

	const { message } = useSelector((state) => state.message);
	const dispatch = useDispatch();

	const onChangeFirstname = (e) => {
		const firstname = e.target.value;
		setFirstname(firstname);
	};

	const onChangeLastname = (e) => {
		const lastname = e.target.value;
		setLastname(lastname);
	};

	const onChangePhone = (e) => {
		const phone = e.target.value;
		setPhone(phone);
	};

	const onChangeStreet = (e) => {
		const street = e.target.value;
		setStreet(street);
	};

	const onChangeComplement = (e) => {
		const complement = e.target.value;
		setComplement(complement);
	};

	const onChangeZipCode = (e) => {
		const zipCode = e.target.value;
		setZipCode(zipCode);
	};

	const onChangeCity = (e) => {
		const city = e.target.value;
		setCity(city);
	};

	const onChangeCountry = (e) => {
		const country = e.target.value;
		setCountry(country);
	};

	const handlePostAdress = (e) => {
		e.preventDefault();

		setSuccessful(false);

		form.current.validateAll();

		if (checkBtn.current.context._errors.length === 0) {
			dispatch(
				postAdress(civility, firstname, lastname, phone, street, complement, zipCode, city, country, UserId)
			)
				.then(() => {
					setSuccessful(true);
				})
				.catch(() => {
					setSuccessful(false);
				});
		}
	};

	return (
		<div className="col-md-12">
			<div className=" card-container card2">
				<Form onSubmit={handlePostAdress} ref={form}>
					{!successful && (
						<div>
							<div className="form-group">
								<select>
									<option> </option>
									<option
										key="Monsieur"
										value={Monsieur}
										onClick={(e) => setCivility(e.target.value)}
									>
										Monsieur
									</option>
									<option key="Madame" value={Madame} onClick={(e) => setCivility(e.target.value)}>
										Madame
									</option>
									<option
										key="Mademoiselle"
										value={Mademoiselle}
										onClick={(e) => setCivility(e.target.value)}
									>
										Mademoiselle
									</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="firstName">Prénom</label>
								<Input
									type="text"
									className="form-control"
									name="firstname"
									value={firstname}
									onChange={onChangeFirstname}
									validations={[ required ]}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="lastName">Nom</label>
								<Input
									type="text"
									className="form-control"
									name="lastname"
									value={lastname}
									onChange={onChangeLastname}
									validations={[ required ]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="username">Numéro de téléphone</label>
								<Input
									type="text"
									className="form-control"
									name="number"
									value={phone}
									onChange={onChangePhone}
									validations={[ required ]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email">Numéro et nom de rue</label>
								<Input
									type="text"
									className="form-control"
									name="adress"
									value={street}
									onChange={onChangeStreet}
									validations={[ required ]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Complément d'adresse</label>
								<Input
									type="text"
									className="form-control"
									name="complement"
									value={complement}
									onChange={onChangeComplement}
									validations={[ required ]}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Code postal</label>
								<Input
									type="text"
									className="form-control"
									name="zip_code"
									value={zipCode}
									onChange={onChangeZipCode}
									validations={[ required ]}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Ville</label>
								<Input
									type="text"
									className="form-control"
									name="city"
									value={city}
									onChange={onChangeCity}
									validations={[ required ]}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Pays</label>
								<Input
									type="text"
									className="form-control"
									name="country"
									value={country}
									onChange={onChangeCountry}
									validations={[ required ]}
								/>
							</div>

							<Link to="/paiement" className="form-group">
								<button className="btn btn-primary btn-block">Procéder au paiement</button>
							</Link>
						</div>
					)}

					{message && (
						<div className="form-group">
							<div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
								{message}
							</div>
						</div>
					)}
					<CheckButton style={{ display: 'none' }} ref={checkBtn} />
				</Form>
			</div>
		</div>
	);
};

export default Adress;
