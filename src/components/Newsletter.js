import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import "./newsletter.css"
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

const Newsletter = () => {
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
				postAdress(civility, firstname, lastname, phone, street, complement, zipCode, city, country)
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
		<div className="col-md-12 card33">
			<div className=" card-container card3">
				<Form onSubmit={handlePostAdress} ref={form}>
					<div>
						<h2 className="newsTitle">Abonnez-vous à la newsletter</h2>
						<p className="newsTitle">
							Recevez les dernières infos sur les soldes et réductions, releases et nouvelles du monde des
							baskets!
						</p>
						
					</div>
<div className="tester">
					<div className="form-group newsInput">
						<label htmlFor="firstName">Adresse email</label>
						<Input
							type="text"
							className="form-control"
							name="firstname"
							value={firstname}
							onChange={onChangeFirstname}
							validations={[ required ]}
						/>
                        <div className="newsButton1">
						<Link to="/">
							<button className="newsButton">ABONNEZ-VOUS</button>
						</Link>
					</div>
                    </div>
					</div>
				</Form>
                
			</div>
		</div>
	);
};

export default Newsletter;
