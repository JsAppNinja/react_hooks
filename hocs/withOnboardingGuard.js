import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import withUser from './auth/withUser';
import gql from 'graphql-tag';

export const GET_CURRENT_USER_WITH_ONBOARDING = gql`
  query getCurrentUser {
    currentUser {
      id
      firstName
      lastName
      username
      email
      hasSearchAccess
      completedAgentOnboarding
      completedHotelOnboarding
      admin
      agent
      hotel
    }
  }
`;

export default function withOnboardingGuard(redirectTo) {
  return function(ComposedComponent) {
    const OnboardingGuard = props => {
      const { currentUser: user } = props;

      if (
        user &&
        ((user.agent && !user.completedAgentOnboarding) ||
          (user.hotel && !user.completedHotelOnboarding))
      ) {
        return <Redirect to={redirectTo} />;
      }

      return <ComposedComponent {...props} />;
    };

    OnboardingGuard.propTypes = {
      currentUser: PropTypes.object
    };

    return withUser(OnboardingGuard, GET_CURRENT_USER_WITH_ONBOARDING);
  };
}
