import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { Link } from '@common/components/common';
import Box from '@material-ui/core/Box';

import logoImage from '@common/assets/images/logo-yellow.png';

const pathToImgs = require.context('../../assets/images', true, /.*.png$/);

const LogoImg = styled('img')({
  width: '160px',
  height: 'auto'
});

const Brand = ({ headerColor, ...rest }) => {
  let path = logoImage;
  try {
    path = pathToImgs(`./logo-${headerColor}.png`);
  } catch (e) {
    console.log(e);
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Link to="/">
        <LogoImg data-cy="brand" src={path} alt="BENNY" />
      </Link>
    </Box>
  );
};

Brand.propTypes = {
  headerColor: PropTypes.string
};

Brand.defaultProps = {
  headerColor: 'yellow'
};

export default Brand;
