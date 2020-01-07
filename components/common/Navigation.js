import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ArrowButton = ({ icon, ...rest }) => (
  <Box {...rest}>
    <Fab variant="round">{icon}</Fab>
  </Box>
);

ArrowButton.propTypes = {
  icon: PropTypes.node.isRequired
};

export const ArrowLeft = props => (
  <ArrowButton icon={<ArrowBackIcon />} left={20} {...props} />
);
export const ArrowRight = props => (
  <ArrowButton icon={<ArrowForwardIcon />} right={20} {...props} />
);
