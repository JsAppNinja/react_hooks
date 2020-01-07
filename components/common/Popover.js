import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MUIPopover from '@material-ui/core/Popover';

const Popover = ({ panelId, toggleContent, popoverContent, ...rest }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? panelId : null;

  return (
    <Box width="100%" {...rest}>
      <Box
        width="100%"
        aria-describedby={id}
        onClick={handleClick}
        children={toggleContent}
      />
      <MUIPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        children={popoverContent}
      />
    </Box>
  );
};

Popover.propTypes = {
  panelId: PropTypes.string,
  toggleContent: PropTypes.node.isRequired,
  popoverContent: PropTypes.node.isRequired
};

Popover.defaultProps = {
  panelId: 'benny-popover'
};

export default Popover;
