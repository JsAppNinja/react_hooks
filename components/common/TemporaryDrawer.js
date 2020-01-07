import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';

export const SIDES = {
  TOP: 'top',
  LEFT: 'left',
  BOTTOM: 'bottom',
  RIGHT: 'right'
};

const TemporaryDrawer = ({ toggleContent, listContent, side, ...rest }) => {
  const [state, setState] = React.useState({
    open: false
  });

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ open });
  };

  const listPanelWidth = [SIDES.TOP, SIDES.BOTTOM].includes(side) ? 1 : 250;

  const listPanel = (
    <Box
      width={listPanelWidth}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      children={listContent}
    />
  );

  return (
    <Box {...rest}>
      <Fab
        data-cy="toggle-drawer"
        color="default"
        size="small"
        onClick={toggleDrawer(true)}
        children={toggleContent}
      />
      <Drawer
        anchor={side}
        open={state.open}
        onClose={toggleDrawer(false)}
        children={listPanel}
      />
    </Box>
  );
};

TemporaryDrawer.propTypes = {
  side: PropTypes.oneOf(Object.values(SIDES)).isRequired,
  toggleContent: PropTypes.node.isRequired,
  listContent: PropTypes.node.isRequired
};

export default TemporaryDrawer;
