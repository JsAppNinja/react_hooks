import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import MuiIcon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

const SmallImg = styled(({ size, ...other }) => <img {...other} />)({
  width: props => `${props.size}px`,
  height: props => `${props.size}px`
});

const svgPath = require.context('../../assets/icons', true);

const Icon = ({ svg = false, icon, size, color, tooltip, ...rest }) => {
  let component = <MuiIcon children={icon} {...rest} />;

  if (svg) {
    component = (
      <MuiIcon style={{ fontSize: `${size}px` }}>
        <SmallImg size={size} src={svgPath(`./${icon}.svg`)} />
      </MuiIcon>
    );
  }

  if (tooltip) {
    component = <Tooltip title={tooltip}>{component}</Tooltip>;
  }

  return component;
};

Icon.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  tooltip: PropTypes.bool
};

Icon.defaultProps = {
  color: 'action',
  size: 20,
  tooltip: false
};

export default Icon;
