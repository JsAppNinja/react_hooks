import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import withAuthGuard from '@common/hocs/auth/withAuthGuard';
import withOnboardingGuard from '@common/hocs/withOnboardingGuard';

const RouteWithSubRoutes = ({
  path,
  computedMatch,
  component,
  auth,
  exact,
  authCheck,
  roles,
  redirectTo,
  onboardingUrl,
  ...rest
}) => {
  let Component = component;

  if (auth || roles) {
    if (onboardingUrl && onboardingUrl !== path) {
      Component = withOnboardingGuard(onboardingUrl)(Component);
    }
    Component = withAuthGuard(redirectTo, roles, authCheck)(Component);
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={props => <Component {...props} {...rest} match={computedMatch} />}
    />
  );
};

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  computedMatch: PropTypes.object,
  component: PropTypes.func,
  routes: PropTypes.array,
  auth: PropTypes.bool,
  authCheck: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.string),
  redirectTo: PropTypes.string,
  onboardingUrl: PropTypes.string
};

RouteWithSubRoutes.defaultProps = {
  exact: false
};

export default RouteWithSubRoutes;
