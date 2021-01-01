import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import './landing.css'

const items = [
  {
    src: 'https://i0.wp.com/laskateboarderie.com/wp-content/uploads/2018/09/10-things-we-want-from-colin-kaepernick-nike-just-do-it-1.jpg?fit=750%2C434&ssl=1',
  },
  {
    src: 'https://img.20mn.fr/pey0353HQZasxofBwjEltw/310x190_nike-devoile-12-fevrier-2017-nouvelle-campagne-publicite-pro-egalite.jpg',
  },
  {
    src: 'https://cdn.1min30.com/wp-content/uploads/2015/07/Capture-d%E2%80%99%C3%A9cran-2015-07-07-%C3%A0-10.36.51.png',
  }
];

const Car = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(false)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="carImg" src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Car;
