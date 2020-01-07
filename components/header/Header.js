import React, { useContext } from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { omit } from 'lodash';
import { If } from '@common/components/common';
import { withUser, withLogout } from '@common/hocs/auth';
import Container from '@material-ui/core/Container';
import PublicMenu from './PublicMenu';
import Brand from './Brand';
import UserMenu from './UserMenu';
import AppContext from '@common/helpers/context';
import { colors } from '@constants/style';

const HeaderBox = styled(Box)({
  position: 'relative',
  zIndex: '99'
});

const HeaderAppBar = styled(({ isTransparent, ...other }) => (
  <AppBar {...other} />
))({
  backgroundColor: props => (props.isTransparent ? 'transparent' : undefined)
});

const StyledToolbar = styled(({ headerColor, ...other }) => (
  <Toolbar {...other} />
))({
  borderBottomColor: props => colors[props.headerColor]
});

const HeaderView = ({
  currentUserData,
  currentUserLoading,
  currentUserError,
  userMenuItems,
  leftPublicItems,
  rightPublicItems,
  HeaderNav,
  logout,
  children,
  ...rest
}) => {
  const theme = useContext(AppContext);

  const logoutMenuItem = {
    key: 'logout',
    label: 'Log out',
    onClick: logout
  };
  const loggedInUserMenuItems = [...userMenuItems, logoutMenuItem];

  const restProps = omit(rest, [
    'client',
    'history',
    'location',
    'match',
    'mutate',
    'staticContext',
    'currentUser',
    'currentUserLoading',
    'currentUserError',
    'currentUserData'
  ]);

  if (currentUserLoading || currentUserError) {
    return null;
  }

  const { currentUser } = currentUserData;
  // We need to expose logout functionality to the test suite because of a
  // cookie leaking bug in cypres.
  // Since it is just once and logout is defined in this scope, I am sticking
  // it on window here.
  if (process.browser) {
    if (!window.hasOwnProperty('cypressLogout')) {
      window.cypressLogout = logout;
    }
  }

  return (
    <HeaderBox {...restProps}>
      <HeaderAppBar
        isTransparent={theme.isTransparent}
        position="static"
        color="default"
      >
        <StyledToolbar headerColor={theme.headerColor}>
          <Container>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <PublicMenu menuItems={leftPublicItems} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Brand headerColor={theme.headerColor} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex" justifyContent="flex-end">
                  <If
                    condition={currentUser !== null}
                    render={() => (
                      <UserMenu menuItems={loggedInUserMenuItems} />
                    )}
                    otherwise={() => (
                      <PublicMenu menuItems={rightPublicItems} />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </StyledToolbar>
        {currentUser !== null && !!HeaderNav && (
          <HeaderNav currentUser={currentUser} />
        )}
        {children}
      </HeaderAppBar>
    </HeaderBox>
  );
};

HeaderView.propTypes = {
  currentUserData: PropTypes.object,
  currentUserError: PropTypes.any,
  currentUserLoading: PropTypes.bool,
  children: PropTypes.node,
  userMenuItems: PropTypes.arrayOf(PropTypes.object),
  leftPublicItems: PropTypes.arrayOf(PropTypes.object),
  rightPublicItems: PropTypes.arrayOf(PropTypes.object),
  HeaderNav: PropTypes.object,
  logout: PropTypes.func.isRequired
};

HeaderView.defaultProps = {
  userMenuItems: [],
  leftPublicItems: [],
  HeaderNav: null,
  rightPublicItems: []
};

export default withUser(withLogout(HeaderView), null, true);
