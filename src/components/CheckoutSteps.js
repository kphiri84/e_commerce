import React from 'react';
import './check.css'
import { Link } from 'react-router-dom'

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Connexion</div>
      <div className={props.step2 ? 'active' : ''}><Link className="step" to="/adresse">Livraison</Link></div>
      <div className={props.step3 ? 'active' : ''}><Link className="step" to="/paiement">Paiement</Link></div>
      <div className={props.step4 ? 'active' : ''}><Link className="step" to="/recapitulatif">Récapitulatif</Link></div>
    </div>
  );
}