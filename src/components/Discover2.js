import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import { Col } from 'reactstrap';
import './landing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Discover = () => {
	const description = [
		{
			id: 1,
			gamme: "d'accessoires",
			text: 'text the text1',
			link: 'accessoires'
		},
		{
			id: 2,
			gamme: 'de sacs',
			text: 'text the text2',
			link: 'sacs'
		},
		{
			id: 3,
			gamme: 'de vêtements',
			text: 'text the text3',
			link: 'vetements'
		},
		{
			id: 4,
			gamme: 'de chaussures',
			text: 'text the text4',
			link: 'chaussures'
		}
	];

	const [ activeIndex, setActiveIndex ] = useState(0);

	const transitions = useTransition(description[activeIndex], (item) => item.id, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: config.molasses
	});

	useEffect(() => void setInterval(() => setActiveIndex((state) => (state + 1) % 4), 8000), []);

	const previous = () => {
		const index = activeIndex === 0 ? description.length - 1 : activeIndex - 1;
		setActiveIndex(index);
	};
	const next = () => {
		const index = activeIndex === description.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(index);
	};

	return transitions.map(({ item, props, key }) => (
		<animated.div
			key={key}
			class="bg"
			style={{ ...props, backgroundImage: `url(https://images.unsplash.com/${item.url}&auto=format&fit=crop)` }}
		/>
	));
	// <Col className="section" lg="6">
	// 	{description.map((desc, index) => (
	// 		<div className={index === activeIndex ? 'active' : 'inactive'} >
	// 			<div>
	// 			<h1> Découvrez notre gamme {desc.gamme}</h1>
	// 			<p className="text">
	// 				{desc.text}
	// 			</p>
	// 			</div>
	// 			<button onClick={previous}>
	// 				<FontAwesomeIcon icon={faAngleLeft} />
	// 			</button>
	// 			<button onClick={next}>
	// 				<FontAwesomeIcon icon={faAngleRight} />
	// 			</button>
	// 			<Link to={`/${desc.link}`}className="arrowRight">
	// 				<p>
	// 					Voir plus <FontAwesomeIcon icon={faArrowRight} />
	// 				</p>
	// 			</Link>
	// 		</div>
	// 	))}
	// </Col>
};

export default Discover;
