import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export const ALERT_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
};

const COLOR_MAP = {
  [ALERT_TYPES.INFO]: 'primary.main',
  [ALERT_TYPES.WARNING]: 'secondary.main',
  [ALERT_TYPES.ERROR]: 'error.main'
};

const AlertPanel = ({ type, text, ...rest }) => {
  const color = COLOR_MAP[type];

  return (
    <Box
      p={3}
      color={color}
      display="flex"
      alignItems="center"
      width={1}
      {...rest}
    >
      <Typography variant="body1" children={text} />
    </Box>
  );
};

AlertPanel.propTypes = {
  type: PropTypes.oneOf(Object.values(ALERT_TYPES)),
  text: PropTypes.string
};

AlertPanel.defaultProps = {
  type: ALERT_TYPES.INFO
};

export default AlertPanel;
