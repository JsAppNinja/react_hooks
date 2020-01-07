import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { MenuLink } from '@common/components/common';

const DropdownMenu = ({
  toggleLabel,
  dropdownTitle,
  panelId,
  menuItems,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box {...rest}>
      <Button
        aria-owns={open ? panelId : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
        children={toggleLabel}
      />
      <Menu
        id={panelId}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
      >
        {dropdownTitle && (
          <Box p={2}>
            <Typography color="primary" children={dropdownTitle} />
          </Box>
        )}
        {menuItems.map(({ key, ...itemRestProps }) => (
          <MenuItem key={key} onClick={handleClose}>
            <MenuLink {...itemRestProps} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

DropdownMenu.propTypes = {
  toggleLabel: PropTypes.node.isRequired,
  dropdownTitle: PropTypes.string,
  panelId: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.object)
};

DropdownMenu.defaultProps = {
  panelId: 'benny-dropdown',
  menuItems: []
};

export default DropdownMenu;
