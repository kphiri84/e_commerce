import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import data from '../data.json';
import './Discover.css';
function Discover() {
	const elRef = useRef([]);
	const elRefImg = useRef([]);
	const [ count, setCount ] = useState(0);

	useEffect(
		() => {
			for (let i = 0; i < data.info.length; i++) {
				const offSet = 100 * count;
				const move = i * 100 - offSet;
				elRefImg.current[i].style = `transform: translateX(${move}%)`;
				elRef.current[i].style = `transform: translateX(${move}%)`;
			}
		},
		[ count ]
	);

	useEffect(() => {
		for (let i = 0; i < data.info.length; i++) {
			elRefImg.current[i].style = `transform: translateX(${100 * i}%)`;
			elRef.current[i].style = `transform: translateX(${100 * i}%)`;
		}
	}, []);

	const handleForward = () => {
		setCount((prev) => (prev += 1));
		if (count === elRef.current.length - 1) {
			setCount(0);
		}
	};

	setTimeout(function k (){
			const index = count === data.info.length - 1 ? 0 : count + 1;
			setCount(index);
	}, 5000);

	const handleBack = () => {
		setCount((prev) => (prev -= 1));
		if (count === 0) {
			setCount(elRef.current.length - 1);
		}
	};

	return (
		<div className="test4">
			<div className="App-content-hero-inline">
				{data.info.map((item, i) => (
					<div key={item.title}>
						<div ref={(ref) => (elRefImg.current[i] = ref)} className="App-content-hero-img">
							<img src={item.imgSrc} alt="" />
						</div>
						<div className="overflow" />
						<div className="App-content-hero-text">
							<div ref={(ref) => (elRef.current[i] = ref)} className="content-hero-text">
								<h1 className="title-hero-text">{item.title}</h1>
								<p>{item.content}</p>
								<div className="content-shop-now">
									<span className="shop-now">Voir plus</span>
									<span className="icon-shop-now">
										<img src="icon-arrow.svg" alt="" />
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
				<div className="parent-content-button">
						<button className="action-button-left" onClick={handleBack}>
							<FontAwesomeIcon icon={faAngleLeft} />
						</button>
						<button className="action-button-right" onClick={handleForward}>
							<FontAwesomeIcon className="ioi" icon={faAngleRight} />
						</button>
				</div>
			</div>
		</div>
	);
}
export default Discover;
