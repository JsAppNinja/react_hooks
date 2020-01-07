import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

Breadcrumb.propTypes = {
  label: PropTypes.string, // last label used for current page
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.node
    })
  ) // breadcrumbs for top level pages
};

function Breadcrumb({ items, label, ...rest }) {
  return (
    <Breadcrumbs arial-label="Breadcrumb" {...rest}>
      {items.map(item => (
        <Link
          key={item.url}
          color="inherit"
          component={RouterLink}
          to={item.url}
        >
          {item.label}
        </Link>
      ))}
      <Typography color="textPrimary">{label}</Typography>
    </Breadcrumbs>
  );
}

export default Breadcrumb;
