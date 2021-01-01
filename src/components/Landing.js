import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import './landing.css';
import Discover from './Discover';
import Car from './Carousel';
import Newsletter from './Newsletter';
import Footer from './Footer';

const Landing = () => {
	return (
		<Container className="test1">
			<Row>
				<Discover />
			</Row>
			<Row className="section">
				<Col className="section" lg="4">
					<img
						className="homeImg2"
						src="https://www.pubenstock.com/wp-content/uploads/2013/08/Nike-Breakdancer7-905x500.jpg"
						alt=""
					/>
				</Col>
				<Col className="section" lg="4">
					<h1>A propos</h1>
					<p>Catalogues de chaussures</p>
				</Col>
				<Col className="section"lg="4">
					<img
						className="homeImg2"
						src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/nikerga-20170530051000364.jpg"
						alt=""
					/>
				</Col>
			</Row>
			<Row>
				<Car />
			</Row>
			<Row>
				<Newsletter />
			</Row>
		</Container>
	);
};

export default Landing;
