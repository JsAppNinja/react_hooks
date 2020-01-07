import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from './Carousel';

const CarouselImage = styled.div`
  background-image: url(${p => p.src});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 0;
  min-height: 400px;
  padding-bottom: 100%;
  background-position: center;
  display: block !important;
`;

SingleCarousel.propTypes = {
  height: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string)
};

function SingleCarousel({ height, images }) {
  const carouselItems = images.map((src, index) => (
    <CarouselImage key={`img_${index}`} src={src} height={height} />
  ));
  return <Carousel displayCounts={1} items={carouselItems} />;
}

export default SingleCarousel;
