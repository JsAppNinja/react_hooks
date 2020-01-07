import React from 'react';
import PropTypes from 'prop-types';
import withUser from './withUser';

export { GET_CURRENT_USER } from './withUser';

export default function withAdmin(ComposedComponent) {
  const CurrentAdmin = props => {
    const { currentUser: user } = props;
    const admin = user && user.admin ? user : null;

    return <ComposedComponent {...props} currentAdmin={admin} />;
  };

  CurrentAdmin.propTypes = {
    currentUser: PropTypes.object
  };

  return withUser(CurrentAdmin);
}
