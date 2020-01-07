import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { Redirect } from 'react-router';
import withUser from './withUser';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';
import get from 'lodash/get';

export default function withAuthGuard(
  redirectTo = '/login',
  roles = [],
  authCheck = () => true,
  composedHocs = [withRouter]
) {
  return function(ComposedComponent) {
    const AuthGuard = props => {
      const {
        currentUserData: userData,
        currentUserLoading: loading,
        currentUserError: error,
        location
      } = props;

      if (loading) {
        return <div>Loading</div>;
      }
      if (error) {
        return <div>Error loading, please try again</div>;
      }

      const user = userData.currentUser;

      // check if user is authenticated
      // OR if user's role is in allowed roles
      if (
        isNil(user) ||
        (roles && roles.length && !roles.some(role => user[role])) ||
        !authCheck(user)
      ) {
        if (get(location, 'pathname')) {
          return <Redirect to={`${redirectTo}?next=${location.pathname}`} />;
        }
        return <Redirect to={redirectTo} />;
      }

      return <ComposedComponent {...props} />;
    };

    AuthGuard.propTypes = {
      currentUserData: PropTypes.object,
      currentUserLoading: PropTypes.bool,
      currentUserError: PropTypes.object,
      location: PropTypes.object
    };

    // Force withUser to render authguard before checking for loading or error,
    // Authguard will check these states itself
    const AuthGuardWithUser = withUser(AuthGuard, null, true);

    // Put other composed components in an array so that we can not nest
    // router components during tests
    if (composedHocs.length) {
      const enhance = compose(...composedHocs);
      return enhance(AuthGuardWithUser);
    }
    return AuthGuardWithUser;
  };
}
