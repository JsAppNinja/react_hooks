import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { default as MuiLink } from '@material-ui/core/Link';

const LinkComponent = ({ to, children, ...rest }) => {
  return (
    <MuiLink component={Link} to={to} {...rest}>
      {children}
    </MuiLink>
  );
};

LinkComponent.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired
};

export default LinkComponent;
