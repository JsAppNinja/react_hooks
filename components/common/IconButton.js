import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import MUIIconButton from '@material-ui/core/IconButton';
import { Icon } from '@common/components/common';

const IconButton = ({ icon, onClick, ...rest }) => (
  <MUIIconButton onClick={onClick} {...rest}>
    <Icon icon={icon} />
  </MUIIconButton>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

IconButton.defaultProps = {
  onClick: noop
};

export default IconButton;
