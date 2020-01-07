import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const BackgroundImage = styled(Box)({
  backgroundSize: 'cover',
  backgroundPosition: 'center center'
});

const ImageChanger = ({ src, width, height, children, shape }) => {
  const style = { backgroundImage: `url(${src})` };

  let border = '';
  if (!src) {
    border = 1;
  }

  if (shape == 'circle') {
    const circleRadius = Math.min(width, height);
    style.borderRadius = `${circleRadius}px`;
  }
  return (
    <BackgroundImage
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={width}
      height={height}
      style={style}
      border={border}
    >
      {children}
    </BackgroundImage>
  );
};

ImageChanger.defaultProps = {
  width: 200,
  height: 200,
  shape: 'square'
};

ImageChanger.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
  shape: PropTypes.oneOf(['square', 'circle'])
};

export default ImageChanger;
