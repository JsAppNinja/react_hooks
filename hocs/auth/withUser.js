import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import get from 'lodash/get';

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      firstName
      lastName
      username
      email
      admin
      agent
      hotel
      hasSearchAccess
      image {
        id
        publicUrl
      }
    }
  }
`;

export default function withUser(
  ComposedComponent,
  customQuery = null,
  forceRender = false
) {
  function CurrentUser(props) {
    return (
      <Query query={customQuery || GET_CURRENT_USER}>
        {({ data, loading, error }) => {
          const currentUser = get(data, 'currentUser', null);

          if (currentUser === undefined) {
            return null;
          }
          // When called with forceRender, make the caller deal with
          // all aspects of the query
          if (forceRender) {
            return (
              <ComposedComponent
                {...props}
                currentUserData={data}
                currentUserLoading={loading}
                currentUserError={error}
                // For backwards compatability, prefer not to use currentUser
                // directly going forward
                currentUser={data && data.currentUser}
              />
            );
          }

          const { location } = props;
          const redirectTo = '/logged-out';

          if (loading) {
            return null;
          }

          if (error) {
            return <div>There was an error, please try again</div>;
          }

          // currentUser can be null when logging in to a logged in user.
          // In that case, we should get the updated user object very quickly,
          // so we can return null for a render
          if (currentUser === undefined) {
            return null;
          }

          if (currentUser === null) {
            /*
              When we are already at the redirect path, do not render further
              redirects.

              This is because this component is often wrapping multiple
              components down the tree, and can get caught in a redirect-render
              loop with itself without an explicit base case

              If you are caught in a redirect loop due to this component,
              try and make sure all currently rendering copies of withUser use
              forceRender, and thus do not redirect each other.
            */
            if (location.pathname != redirectTo) {
              return <Redirect to={redirectTo} />;
            }
          }

          return <ComposedComponent {...props} currentUser={currentUser} />;
        }}
      </Query>
    );
  }
  CurrentUser.propTypes = {
    location: PropTypes.object
  };
  return withRouter(CurrentUser);
}
