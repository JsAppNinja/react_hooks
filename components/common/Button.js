import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const ButtonComponent = ({
  loading,
  disabled,
  icon,
  children,
  ml,
  mr,
  ...rest
}) => {
  return (
    <Box display="inline-block" position="relative" ml={ml} mr={mr}>
      <Button disabled={loading || disabled} {...rest}>
        {icon && <Box component={Icon} children={icon} mr={1} />}
        {children}
      </Button>
      {loading && (
        <Box
          component={CircularProgress}
          position="absolute"
          top="50%"
          left="50%"
          mt="-12px"
          ml="-12px"
          size={24}
        />
      )}
    </Box>
  );
};

ButtonComponent.propTypes = {
  ml: PropTypes.any,
  mr: PropTypes.any,
  children: PropTypes.node,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool
};

ButtonComponent.defaultProps = {
  variant: 'contained',
  color: 'primary'
};

export default ButtonComponent;
