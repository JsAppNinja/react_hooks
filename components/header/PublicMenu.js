import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { MenuLink } from '@common/components/common';

const PublicMenu = ({ menuItems, ...rest }) => (
  <Box display="flex" alignItems="center" {...rest}>
    {menuItems.map(({ key, ...itemRestProps }) => (
      <Box key={key} mr={3}>
        <MenuLink {...itemRestProps} />
      </Box>
    ))}
  </Box>
);

PublicMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PublicMenu;
