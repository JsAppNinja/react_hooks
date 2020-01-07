import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const SideBarView = ({ sideBarItems, ...rest }) => (
  <Box
    display="flex"
    flexDirection="column"
    flex="0 0 100px"
    bgcolor="lightGray"
    minHeight={500}
    p={3}
    {...rest}
  >
    {sideBarItems.map(({ key, children, ...itemProps }) => (
      <Link component={NavLink} key={key} {...itemProps}>
        <Box mb={3}>
          <Typography children={children} />
        </Box>
      </Link>
    ))}
  </Box>
);

SideBarView.propTypes = {
  sideBarItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SideBarView;
