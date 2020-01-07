import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MUIAvatar from '@material-ui/core/Avatar';

const Avatar = props => <Box component={MUIAvatar} m={2} {...props} />;

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.node
};

export default Avatar;
