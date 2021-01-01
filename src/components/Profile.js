import React, { useState, useEffect } from 'react';
import './profile.css';
import { Container, Col } from 'reactstrap';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
	const [ details, setDetails ] = useState({
    firstname: '',
    lastname: '',
		email: ''
	});

	useEffect(() => {
		getProfil();
	}, []);

	const getProfil = () => {

		setDetails({
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
			email: currentUser.email
		});
	};

	const [ modif, setModif ] = useState(false);
	const [ modifiedProfile, setModifiedProfile ] = useState({
		email: details.email,
		password: details.password
	});
	const [ typedPW, setTypedPW ] = useState('');
	const [ validPW, setValidPW ] = useState();
	const changePW = (e) => {
		return e.target.value !== '' && typedPW !== '' && e.target.value === typedPW
			? setValidPW(true) & setModifiedProfile({ ...modifiedProfile, password: e.target.value })
			: setValidPW(false);
	};
	const modifprof = () => {
		setModif(!modif);
	};
	const validprof = () => {
		setDetails({
			...details,
			mail: modifiedProfile.mail,
			password: modifiedProfile.password
		});
		setModif(!modif);
	};
	return (
		<Container>
			<Col className="profile_page">
				<table>
					<tbody>
						<tr className="entete">Prenom</tr>
						<tr className="valeur">{details.firstname}</tr>
            <tr className="entete">Nom</tr>
						<tr className="valeur">{details.lastname}</tr>
						<tr className="entete">Adresse Mail</tr>
						<tr className="valeur">
							{modif ? (
								<input
									type="text"
									value={modifiedProfile.mail}
									onChange={(e) =>
										setModifiedProfile({
											...modifiedProfile,
											mail: e.target.value
										})}
								/>
							) : (
								details.email
							)}
						</tr>
						{modif ? (
							<div>
								<tr className="entete">Nouveau mot de passe</tr>
								<tr className="valeur">
									<input
										type="password"
										className={validPW ? 'valid' : 'invalid'}
										value={typedPW}
										onChange={(e) => setTypedPW(e.target.value)}
									/>
								</tr>
								<tr className="entete">Valider mot de passe</tr>
								<tr>
									<input
										type="password"
										className={validPW ? 'valid' : 'invalid'}
										onChange={(e) => changePW(e)}
									/>
								</tr>
							</div>
						) : (
							''
						)}
					</tbody>
				</table>
				<div>
					{modif ? (
						<button className="modif_button" onClick={(e) => validprof(e)}>
							Valider mon profil
						</button>
					) : (
						<button className="modif_button" onClick={(e) => modifprof(e)}>
							Modifier mon profil
						</button>
					)}
				</div>
			</Col>
		</Container>
	);
};
export default Profile;
