import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@common/components/common';

const ButtonLink = ({ to, loading, disabled, icon, children, ...rest }) => {
  return (
    <Button
      loading={loading}
      disabled={disabled}
      icon={icon}
      component={Link}
      to={to}
      {...rest}
    >
      {children}
    </Button>
  );
};

ButtonLink.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  to: PropTypes.string.isRequired
};

ButtonLink.defaultProps = {
  variant: 'contained',
  color: 'primary'
};

export default ButtonLink;
