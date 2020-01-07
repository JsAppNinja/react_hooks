import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import NavLink from './NavLink';
import AppContext from '@common/helpers/context';
import { colors } from '@constants/style';

const MenuLink = ({ to, ...rest }) => {
  const theme = useContext(AppContext);

  const css = {
    cursor: 'pointer',
    color: colors[theme.headerColor]
  };

  if (to) {
    return <Box component={NavLink} css={css} to={to} {...rest} />;
  }

  return <Link css={css} {...rest} />;
};

MenuLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default MenuLink;
