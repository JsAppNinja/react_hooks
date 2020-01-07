import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const HeaderNav = ({
  location,
  navItems,
  staticContext, // eslint-disable-line
  ...rest
}) => {
  const [value, setValue] = useState(0);
  useEffect(setActiveTab);

  function setActiveTab() {
    const index = navItems
      .map(e => e.to)
      .findIndex(path => matchPath(location.pathname, { path }));
    if (index > -1) {
      setValue(index);
    }
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Box {...rest}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        centered
      >
        {navItems.map(({ key, label, to, ...itemProps }) => (
          <Tab
            component={Link}
            label={label}
            to={to}
            key={key}
            {...itemProps}
          />
        ))}
      </Tabs>
    </Box>
  );
};

HeaderNav.propTypes = {
  location: PropTypes.object.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withRouter(HeaderNav);
